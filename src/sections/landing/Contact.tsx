import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// ── Enquire Form ────────────────────────────────────────────────────────────
const EnquireForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Full Name</label>
        <input
          type="text"
          placeholder="e.g. Sophia Martinez"
          {...register("name", { required: "Full name is required", minLength: { value: 3, message: "Minimum 3 characters required" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name.message as string}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Email ID</label>
        <input
          type="email"
          placeholder="sophia@example.com"
          {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message as string}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Contact Us</label>
        <input
          type="text"
          placeholder="+1 234 567 890"
          {...register("contact", { required: "Contact number is required", pattern: { value: /^[0-9+\s()-]{7,}$/, message: "Enter a valid contact number" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.contact && <p className="text-red-400 text-sm">{errors.contact.message as string}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">What would you like to discuss?</label>
        <textarea
          rows={4}
          {...register("message", { required: "Message is required", minLength: { value: 10, message: "Minimum 10 characters required" } })}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:border-[#CEA574] outline-none resize-none"
        />
        {errors.message && <p className="text-red-400 text-sm">{errors.message.message as string}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-[#CEA574] text-white font-offside text-xl rounded-full transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : isSubmitSuccessful ? "Sent Successfully" : "Get in Touch"}
      </button>
    </form>
  );
};

// ── Schedule a Meeting Form ─────────────────────────────────────────────────
const ScheduleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  // Refs for auto-advance
  const monthRef  = useRef<HTMLInputElement | null>(null);
  const yearRef   = useRef<HTMLInputElement | null>(null);
  const hourRef   = useRef<HTMLInputElement | null>(null);
  const minuteRef = useRef<HTMLInputElement | null>(null);
  const ampmRef   = useRef<HTMLSelectElement | null>(null);

  // Focus next field when current is filled to maxLen
  const advance = (
    value: string,
    maxLen: number,
    nextRef: React.RefObject<HTMLInputElement | HTMLSelectElement | null>,
  ) => {
    if (value.length >= maxLen) nextRef.current?.focus();
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
  };

  // react-hook-form register + merge our own ref
  const mergeRef = <T extends HTMLInputElement>(
    rhfRef: (el: T | null) => void,
    localRef: React.MutableRefObject<T | null>,
  ) => (el: T | null) => {
    rhfRef(el);
    localRef.current = el;
  };

  const {
    ref: dayRhfRef,    onChange: dayOnChange,    ...dayRest    } = register("day",    { required: true });
  const {
    ref: monthRhfRef,  onChange: monthOnChange,  ...monthRest  } = register("month",  { required: true });
  const {
    ref: yearRhfRef,   onChange: yearOnChange,   ...yearRest   } = register("year",   { required: true });
  const {
    ref: hourRhfRef,   onChange: hourOnChange,   ...hourRest   } = register("hour",   { required: true });
  const {
    ref: minuteRhfRef, onChange: minuteOnChange, ...minuteRest } = register("minute", { required: true });
  const {
    ref: ampmRhfRef, ...ampmRest } = register("ampm", { required: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Full Name */}
      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Full Name</label>
        <input
          type="text"
          placeholder="e.g. Sophia Martinez"
          {...register("name", { required: "Full name is required", minLength: { value: 3, message: "Minimum 3 characters required" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name.message as string}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Email ID</label>
        <input
          type="email"
          placeholder="sophia@example.com"
          {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message as string}</p>}
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-3">
        <label className="font-old-standard text-sm md:text-base tracking-wide">Contact Number</label>
        <input
          type="text"
          placeholder="+1 234 567 890"
          {...register("contact", { required: "Contact number is required", pattern: { value: /^[0-9+\s()-]{7,}$/, message: "Enter a valid contact number" } })}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 focus:border-[#CEA574] outline-none"
        />
        {errors.contact && <p className="text-red-400 text-sm">{errors.contact.message as string}</p>}
      </div>

      {/* Date & Time */}
      <div className="flex gap-6">
        {/* ── Date ── */}
        <div className="flex flex-col gap-3 flex-1">
          <label className="font-old-standard text-sm md:text-base tracking-wide">*Date</label>
          <div className="flex gap-2">
            {/* DD */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              maxLength={2}
              ref={dayRhfRef}
              onChange={(e) => {
                dayOnChange(e);
                advance(e.target.value, 2, monthRef);
              }}
              {...dayRest}
              className="w-14 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm"
            />
            {/* MM */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              maxLength={2}
              ref={mergeRef(monthRhfRef, monthRef as React.MutableRefObject<HTMLInputElement>)}
              onChange={(e) => {
                monthOnChange(e);
                advance(e.target.value, 2, yearRef);
              }}
              {...monthRest}
              className="w-14 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm"
            />
            {/* YYYY */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              maxLength={4}
              ref={mergeRef(yearRhfRef, yearRef as React.MutableRefObject<HTMLInputElement>)}
              onChange={(e) => {
                yearOnChange(e);
                advance(e.target.value, 4, hourRef);
              }}
              {...yearRest}
              className="w-20 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm"
            />
          </div>
          {(errors.day || errors.month || errors.year) && (
            <p className="text-red-400 text-xs">Enter a valid date</p>
          )}
        </div>

        {/* ── Time ── */}
        <div className="flex flex-col gap-3 flex-1">
          <label className="font-old-standard text-sm md:text-base tracking-wide">*Time</label>
          <div className="flex gap-2">
            {/* HH */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="HH"
              maxLength={2}
              ref={mergeRef(hourRhfRef, hourRef as React.MutableRefObject<HTMLInputElement>)}
              onChange={(e) => {
                hourOnChange(e);
                advance(e.target.value, 2, minuteRef);
              }}
              {...hourRest}
              className="w-14 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm"
            />
            {/* MM */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              maxLength={2}
              ref={mergeRef(minuteRhfRef, minuteRef as React.MutableRefObject<HTMLInputElement>)}
              onChange={(e) => {
                minuteOnChange(e);
                advance(e.target.value, 2, ampmRef);
              }}
              {...minuteRest}
              className="w-14 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm"
            />
            {/* AM/PM */}
            <select
              ref={mergeRef(ampmRhfRef, ampmRef as React.MutableRefObject<HTMLSelectElement>)}
              {...ampmRest}
              className="w-20 h-11 bg-white/5 border border-white/10 rounded-lg text-center focus:border-[#CEA574] outline-none text-sm appearance-none cursor-pointer"
            >
              {/* <option value="" className="bg-[#2A2A2A]"></option> */}
              <option value="AM" className="bg-[#2A2A2A]">A.M.</option>
              <option value="PM" className="bg-[#2A2A2A]">P.M.</option>
            </select>
          </div>
          {(errors.hour || errors.minute) && (
            <p className="text-red-400 text-xs">Enter a valid time</p>
          )}
        </div>
      </div>

      {/* Working hours note */}
      <p className="text-white/40 text-xs leading-relaxed -mt-4">
        *Working Hours<br />
        Mon – Sat: 10:00 AM – 6:00 PM<br />
        Sunday: By Appointment Only
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-[#CEA574] text-white font-offside text-xl rounded-full transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? "Booking..." : isSubmitSuccessful ? "Appointment Booked!" : "Book Appointment"}
      </button>
    </form>
  );
};

// ── Main Section ────────────────────────────────────────────────────────────
const GetInTouch = () => {
  const [activeTab, setActiveTab] = useState<"enquire" | "schedule">("enquire");

  return (
    <section className="w-full bg-[#2A2A2A] text-white overflow-hidden mt-[-150px]">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32 flex flex-col items-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl md:text-5xl lg:text-[56px] text-center mb-16 leading-[1.2]"
        >
          Get in Touch with Us
        </motion.h2>

        <div className="w-full max-w-[630px] bg-[#5E3E1833] border border-[#CEA574]/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">

          {/* ── Tab Toggle ─────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between border-b border-[#CEA574]/20 pb-4 mb-10 gap-4">
            <button
              onClick={() => setActiveTab("enquire")}
              className={`font-playfair text-xl md:text-2xl transition-colors duration-300 ${
                activeTab === "enquire" ? "text-white" : "text-white/35 hover:text-white/60"
              }`}
            >
              Enquire
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`font-offside text-base md:text-lg transition-colors duration-300 ${
                activeTab === "schedule" ? "text-[#CEA574]" : "text-white/35 hover:text-[#CEA574]/60"
              }`}
            >
              Schedule a Meeting
            </button>
          </div>

          {/* ── Animated Form Switch ───────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {activeTab === "enquire" ? (
              <motion.div
                key="enquire"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: "easeInOut" as any }}
              >
                <EnquireForm />
              </motion.div>
            ) : (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeInOut" as any }}
              >
                <ScheduleForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom link ──────────────────────────────────────────────────── */}
        <div className="mt-[28px] text-center">
          <p className="text-white/80 font-old-standard text-sm md:text-base">
            Want to have a meeting with us?{" "}
            <button
              onClick={() => setActiveTab("schedule")}
              className="font-offside text-[#CEA574] underline underline-offset-4 hover:text-white transition-colors duration-300"
            >
              Schedule a Meeting
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};

export default GetInTouch;