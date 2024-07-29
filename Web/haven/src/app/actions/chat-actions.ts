"use server";

import { addMessage, createChat, deleteChat, getChat } from "@/data/chat";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createANewChatAction(message: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw "User not logged in";
    }

    const response = await fetch(
      "https://haven-app-1.onrender.com/title?message=" + message,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const title = (await response.json()).response as string;

    const chat = await createChat(session.user.id, title || "New chat.");
    return chat.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteChatAction(chatId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw "User not logged in";
    }

    const chat = await deleteChat(chatId, session.user.id);
    revalidatePath("/chat");
    return chat.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function addMessageAction(chatId: string, message: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw "User not logged in";
    }
    const chat = await getChat(chatId, session.user.id);
    if (!chat) throw "Chat not found";

    const messageId = (await addMessage(chatId, message, true)).id;
    revalidatePath("/chat");

    return messageId;
  } catch (e) {
    return null;
  }
}

export async function getAIMessageAction(chatId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw "User not logged in";
    }
    const chat = await getChat(chatId, session.user.id);
    if (!chat) throw "Chat not found";

    const aiResponse = await fetch("https://haven-app.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: chat.ChatMessage[chat.ChatMessage.length - 1].message,
        chat_history: chat.ChatMessage.map((chat) => ({
          role: chat.isSent ? "user" : "model",
          message: chat.message,
        })),
      }),
    });
    if (aiResponse.status === 200) {
      const aiResponseData = await aiResponse.json();
      const aiMessage = await addMessage(
        chatId,
        aiResponseData.response as any,
        false
      );

      revalidatePath("/chat");
      return aiMessage;
    } else {
      throw aiResponse;
    }
  } catch (e) {
    console.log("Error while trying to call the API.");
    console.log(e);
    return null;
  }
}
