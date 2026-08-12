import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
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
    <section className="bg-cream min-h-svh pt-28 pb-16 md:pt-24 md:pb-24 padding-responsive">
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

      {/* Page hero — matches the centered eyebrow → title → subtitle band
          used on Menu, FAQ and Store */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <motion.p
          className="text-brand font-semibold uppercase tracking-widest text-[11px] mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We'd Love To Hear From You
        </motion.p>
        <motion.h1
          className="heading font-sans font-bold text-ink uppercase tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Contact <span className="text-brand">Us</span>
        </motion.h1>
        <motion.p
          className="para font-primary text-ink-soft leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Questions, feedback, or collaboration opportunities — let us know how
          we can help and we'll get back to you shortly.
        </motion.p>
      </div>

      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[minmax(0,360px)_1fr] gap-8 lg:gap-14 items-start">

        {/* Left — Info */}
        <motion.div
          className="w-full bg-white rounded-2xl border border-cream-dark shadow-md p-7 md:p-8"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="font-sans font-bold text-lg md:text-xl text-ink uppercase tracking-tight mb-6">
            Contact Details
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                Icon: MapPin,
                label: "Address",
                value:
                  "915, Purvanchal Capital Tower, Vibhuti Khand, Gomti Nagar, Lucknow, U.P. - 226010",
              },
              {
                Icon: Phone,
                label: "Phone",
                value: "+91 9511450700",
                href: "tel:+919511450700",
              },
              {
                Icon: Mail,
                label: "Email",
                value: "hello@crushburg.com",
                href: "mailto:hello@crushburg.com",
              },
            ].map((detail, i) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
              >
                <ContactDetail {...detail} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          className="w-full bg-white rounded-2xl border border-cream-dark shadow-md p-8 md:p-10"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
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
        </motion.div>
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
