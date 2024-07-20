import Testomonial from "@/components/testomonial";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function Home() {
  return (
    <ScrollArea className="h-full bg-[url('/landing-page/background.svg')] bg-no-repeat bg-cover">
      <div className="flex flex-col items-center justify-center h-full w-full px-10">
        <div className="flex flex-col">
          <div className="flex gap-0">
            <Image src={"/landing-page/ticks-left.svg"} width={50} height={50} alt="Left ticks" />
            <p className="text-5xl pt-20 text-center">Your <span className="font-bold">Mental Health</span> <span className="underline decoration-wavy" style={{ textDecorationThickness: "5%", textUnderlineOffset: "10px" }}>Matters</span></p>
            <Image src={"/landing-page/ticks-right.svg"} width={50} height={50} alt="Right ticks" />
          </div>
          <div className="flex gap-5 items-center ml-auto">
            <Image src={"/landing-page/smile-icon.svg"} width={20} height={20} alt="Left ticks" />
          </div>
        </div>
        <p className="my-10 text-2xl mx-auto">Your digital landscape where mindfulness and well-being meet.</p>
        <Image
          width={500}
          height={500}
          src={"/landing-page/hero-icon.svg"}
          alt="Hero Icon" />

        <section className="mt-20 text-center w-full" id="about">
          <h2 className="font-bold text-4xl ml-auto text-center mb-4">How it works?</h2>
          <div className="flex flex-col gap-5 md:flex-row md:items-center mb-6">
            <Image
              width={500}
              height={500}
              className="hidden md:block"
              src={"/landing-page/person.svg"}
              alt="Hero Icon" />
            <p className="lg:px-16 text-justify">
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive
              resources, I've found solace and support in moments of stress. From guided meditations to insightful articles,
              Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting.
              Highly recommend!Mindfulify has truly transformed my digital experience. With its user-friendly interface and
              comprehensive resources, I've found solace and support in moments of stress. From guided meditations to
              insightful articles, Mindfulify offers a holistic approach to mental wellness that's both empowering and
              uplifting. Highly recommend!
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center mb-6">
            <p className="lg:px-16 text-justify">
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive
              resources, I've found solace and support in moments of stress. From guided meditations to insightful articles,
              Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive resources,
              I've found solace and support in moments of stress. From guided meditations to insightful articles, Mindfulify offers
              a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
            </p>
            <Image
              width={500}
              height={500}
              className="hidden md:block"
              src={"/landing-page/brain.svg"}
              alt="Hero Icon" />
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center mb-6">
            <Image
              width={500}
              height={500}
              className="hidden md:block"
              src={"/landing-page/person2.svg"}
              alt="Hero Icon" />
            <p className="lg:px-16 text-justify">
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive
              resources, I've found solace and support in moments of stress. From guided meditations to insightful articles,
              Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting.
              Highly recommend!Mindfulify has truly transformed my digital experience. With its user-friendly interface and
              comprehensive resources, I've found solace and support in moments of stress. From guided meditations to
              insightful articles, Mindfulify offers a holistic approach to mental wellness that's both empowering and
              uplifting. Highly recommend!
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-center mb-6">
            <p className="lg:px-16 text-justify">
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive
              resources, I've found solace and support in moments of stress. From guided meditations to insightful articles,
              Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
              Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive resources,
              I've found solace and support in moments of stress. From guided meditations to insightful articles, Mindfulify offers
              a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
            </p>
            <Image
              width={500}
              height={500}
              className="hidden md:block"
              src={"/landing-page/person3.svg"}
              alt="Hero Icon" />
          </div>
          <p className="font-bold text-2xl">And much more...</p>
        </section>

        <section className="mt-20 text-center w-full" id="reviews">
          <h2 className="font-bold text-4xl ml-auto text-center">Words speaks for us</h2>
          <div className="flex flex-col mt-8">
            <Testomonial person="Emily Smith, California" quote={
              "Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive" +
              "resources, I've found solace and support in moments of stress. From guided meditations to insightful articles," +
              "Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!"
            } />
          </div>
        </section>

        <section className="mt-20 text-center w-full" id="faq">
          <h2 className="font-bold text-4xl ml-auto text-center">FAQs</h2>
          <div className="flex flex-col gap-4 mt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-black text-white p-4 rounded-2xl w-full">
                <AccordionTrigger>How can I use DreamForge to enhance my social media presence?</AccordionTrigger>
                <AccordionContent>
                  How can I use DreamForge to enhance my social media presence?
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-black text-white p-4 rounded-2xl w-full">
                <AccordionTrigger>How can I use DreamForge to enhance my social media presence?</AccordionTrigger>
                <AccordionContent>
                  How can I use DreamForge to enhance my social media presence?
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-black text-white p-4 rounded-2xl w-full">
                <AccordionTrigger>How can I use DreamForge to enhance my social media presence?</AccordionTrigger>
                <AccordionContent>
                  How can I use DreamForge to enhance my social media presence?
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-black text-white p-4 rounded-2xl w-full">
                <AccordionTrigger>How can I use DreamForge to enhance my social media presence?</AccordionTrigger>
                <AccordionContent>
                  How can I use DreamForge to enhance my social media presence?
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-black text-white p-4 rounded-2xl w-full">
                <AccordionTrigger>How can I use DreamForge to enhance my social media presence?</AccordionTrigger>
                <AccordionContent>
                  How can I use DreamForge to enhance my social media presence?
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </section>

        <section className="mt-20 text-center w-full" id="donate">
          <h2 className="font-bold text-4xl ml-auto text-center pb-4">Donate and Help Africans</h2>
          <div className="flex flex-col gap-5 md:flex-row md:items-center mb-6">
            <div className="flex flex-col">
              <p className="lg:pr-16 text-justify mb-4">
                Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive
                resources, I've found solace and support in moments of stress. From guided meditations to insightful articles,
                Mindfulify offers a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
                Mindfulify has truly transformed my digital experience. With its user-friendly interface and comprehensive resources,
                I've found solace and support in moments of stress. From guided meditations to insightful articles, Mindfulify offers
                a holistic approach to mental wellness that's both empowering and uplifting. Highly recommend!
              </p>
              <Button className="bg-accent text-white w-fit px-12 py-6">Donate now!</Button>
            </div>
            <Image
              width={500}
              height={500}
              className="hidden md:block"
              src={"/landing-page/brain2.svg"}
              alt="Hero Icon" />
          </div>
        </section>

        <footer className="flex bg-black text-white min-h-72 py-5 my-8 rounded-xl w-full flex-col items-center lg:flex-row">
          <div className="w-full md:w-1/2 my-auto ml-8">
            <div className="flex flex-col w-full mb-4 lg:w-1/2">
              <p className="font-bold text-3xl mb-8 mx-auto">
                Haven
              </p>
              <p className="text-left font-extralight w-full">
                Your go-to destination for embracing mindfulness and finding inner peace midst the digital noise of today's world.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:justify-between lg:flex-row">
            <div className="flex flex-col justify-center lg:items-end">
              <p className="font-bold text-center">Quick Menu</p>
              <Button variant={"link"} className="font-light text-left pr-0 text-current">About</Button>
              <Button variant={"link"} className="font-light text-left pr-0 text-current">Reviews</Button>
              <Button variant={"link"} className="font-light text-left pr-0 text-current">Donate</Button>
              <Button variant={"link"} className="font-light text-left pr-0 text-current">Get Started</Button>
            </div>
            <div className="flex flex-col justify-center items-start px-8 mt-5">
              <p className="font-bold text-lg text-left">Subscribe to our newletter</p>
              <p className="font-extralight mb-4">Subscribe now to be updates with the latest features</p>
              <div className="flex p-2 w-full bg-white rounded-lg">
                <Input placeholder="Enter your email" className="w-full border-none" />
                <Button className="bg-accent text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </ScrollArea>
  );
}
