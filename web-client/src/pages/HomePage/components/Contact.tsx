import React, { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {}

  return (
    <section id="contact" className="p-page py-10 bg-black-8">
      <div className="flex mobile:flex-col gap-x-10 mobile:gap-y-10 overflow-hidden">
        <div className="flex-col flex-[0.4] bg-black-1 p-8 rounded-2xl gap-y-10">
          <p className="text-secondary text-sm font-poppins tracking-wider uppercase">
            Get in touch
          </p>
          <h1 className="text-back text-5xl font-bold font-poppins">
            Contact.
          </h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-y-8"
          >
            <label className="flex flex-col">
              <span className="text-back font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                placeholder="What's your good name?"
                className="bg-black-7 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-back font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                placeholder="What's your web address?"
                className="bg-black-7 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-back font-medium mb-4">Your Message</span>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                placeholder="What you want to say?"
                className="bg-black-7 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium"
              />
            </label>

            <button
              type="submit"
              className="bg-primary py-3 px-8 rounded-xl outline-none w-fit text-back font-bold "
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        <div className="flex flex-[0.6] items-center justify-center relative">
          <img src={"/images/4-small.png"} alt="sphere" className="z-1 relative w-[20rem] h-[20rem]" />
          <img src={"/images/stars.svg"} alt="star" className="absolute w-full"/>
        </div>
      </div>
    </section>
  );
}
