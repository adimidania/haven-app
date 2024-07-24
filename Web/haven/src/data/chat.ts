import prisma from "@/lib/prisma";

export async function getListOfChatHistory(userId: string) {
  return prisma.chat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getChat(chatId: string, userId: string) {
  return prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
    include: {
      ChatMessage: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

export async function createChat(userId: string, name: string) {
  return prisma.chat.create({
    data: {
      userId,
      name,
    },
  });
}

export async function deleteChat(chatId: string, userId: string) {
  return prisma.chat.delete({
    where: {
      id: chatId,
      userId,
    },
  });
}

export async function getListOfMessages(chatId: string) {
  return prisma.chatMessage.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function addMessage(
  chatId: string,
  message: string,
  isSent: boolean
) {
  return prisma.chatMessage.create({
    data: {
      chatId,
      message,
      isSent,
    },
  });
}
