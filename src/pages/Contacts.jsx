import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import SlideButton from "../components/SlideButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      toast.error("⚠️ Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_c81x8y8",
        "template_5o6opax",
        formData,
        "-cfQhhFo2N8W-jub7"
      );

      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("❌ Failed to send message. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream pt-28 pb-16 md:py-24 padding-responsive">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">

        {/* Left — Info */}
        <div className="flex flex-col justify-between gap-10 max-w-sm mx-auto lg:mx-0 w-full">
          <div className="text-center lg:text-left">
            <h1 className="heading font-heading font-bold text-3xl md:text-5xl text-brand mb-3">
              Contact Us
            </h1>
            <p className="para font-primary text-ink-soft leading-relaxed">
              We are available for questions, feedback, or collaboration
              opportunities. Let us know how we can help!
            </p>
          </div>

          <div className="mx-auto lg:mx-0 w-full">
            <h3 className="heading font-heading font-semibold text-xl md:text-2xl mb-6 text-center lg:text-left">
              Contact Details
            </h3>
            <div className="flex flex-col gap-4">
              <ContactDetail
                Icon={MapPin}
                label="Address"
                value="915, Purvanchal Capital Tower, Vibhuti Khand, Gomti Nagar, Lucknow, U.P. - 226010"
              />
              <ContactDetail
                Icon={Phone}
                label="Phone"
                value="+91 9511450700"
                href="tel:+919511450700"
              />
              <ContactDetail
                Icon={Mail}
                label="Email"
                value="hello@crushburg.com"
                href="mailto:hello@crushburg.com"
              />
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="mx-auto w-full max-w-screen-md bg-white rounded-2xl border border-cream-dark shadow-md p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                label="Name"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="Phone"
                id="phone"
                name="phone"
                placeholder="10-digit Mobile No."
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </div>

            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Subject"
              id="subject"
              name="subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="para font-primary font-medium text-ink-soft"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-xl border border-cream-dark bg-cream px-4 py-2.5 para font-primary text-ink placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-brand resize-none transition"
              />
            </div>

            <div className="flex justify-center mt-2">
              <SlideButton
                value={loading ? "Sending..." : "Send Message"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactDetail = ({ Icon, label, value, href }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex-shrink-0 bg-brand/10 p-2 rounded-full">
      <Icon className="text-brand" size={18} />
    </div>
    <div>
      <span className="para font-primary font-semibold text-ink">{label}: </span>
      {href ? (
        <a href={href} className="para font-primary text-ink-soft underline underline-offset-2 hover:text-brand transition">
          {value}
        </a>
      ) : (
        <span className="para font-primary text-ink-soft">{value}</span>
      )}
    </div>
  </div>
);

const FormField = ({
  label,
  id,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  maxLength,
  required,
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={id} className="para font-primary font-medium text-ink-soft">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className="w-full rounded-xl border border-cream-dark bg-cream px-4 py-2.5 para font-primary text-ink placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-brand transition"
    />
  </div>
);

export default Contact;
