import Image from "next/image";

import event1 from "~/assets/images/event1.png";
import event2 from "~/assets/images/event2.png";
import event3 from "~/assets/images/event3.png";
import Navbar from "~/components/Navbar";

export default function Services() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="max-w-[1250px] space-y-4 p-5">
          <h1 className="text-center text-3xl font-bold">Services</h1>
          <h1 className="text-2xl font-bold">What we Offer</h1>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-10 md:space-y-0">
            <div>
              <h1 className="text-xl font-bold">AuDHD Unmasking Course</h1>
              <p>{`The AuDHD Unmasking Course is a six-week program created by the Family Founder, Enoch Kaz. This course is designed to help participants recognize and how they mask their neurodivergence and connect with and express their unique brilliance. The program is currently in beta testing, and will be available to the public in the Autumn of 2023.`}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Twitter Spaces</h1>
              <p>{`Join our weekly Twitter space, #FullSpectrumFriday, where neurodivergent adults from around the world come together to connect, share their experiences, and build community. It's a safe space where you can be yourself and celebrate your neurodivergent identity. Don't miss out on the fun and support!`}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">1:1 Life Coaching</h1>
              <p>{`Unlock your full potential with our one-on-one life coaching sessions! Our experienced coaches provide a safe and supportive space to help you achieve your personal and professional goals. We understand the unique strengths and challenges of neurodivergent individuals. Let us help you overcome obstacles and thrive in all areas of your life!`}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">IRL Social Events</h1>
              <p>{`Full Spectrum Family hosts a variety of in-person events that bring neurodivergent adults and allies together to connect, learn, and have fun. Our events are designed to foster a sense of community, promote inclusion, and celebrate neurodiversity. From social gatherings to educational workshops, there's something for everyone. Join us for an unforgettable experience and be part of our global movement for acceptance and empowerment!`}</p>
            </div>
          </div>
          <div className="flex space-x-2 pt-5">
            <Image className="w-1/3" src={event1} alt="" />
            <Image className="w-1/3" src={event2} alt="" />
            <Image className="w-1/3" src={event3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
