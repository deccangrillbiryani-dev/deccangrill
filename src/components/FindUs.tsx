import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, ExternalLink } from "lucide-react";

export default function FindUs() {
  return (
    <section id="contact" className="py-24" style={{ background: "hsl(var(--background))" }}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Find Us</p>
          <h2 className="section-title gold-underline">Come Visit Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)", border: "1px solid hsl(var(--gold) / 0.15)" }}
          >
            <iframe
              title="Deccan Grill Plano Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.4!2d-96.7487!3d33.0461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3f5e95f5b5b5%3A0x8e6c5c9a9b8f6a9a!2s909%20W%20Spring%20Creek%20Pkwy%20%23230%2C%20Plano%2C%20TX%2075023!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-10 rounded-3xl"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--gold) / 0.15)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h3 className="font-display font-bold text-2xl mb-8" style={{ color: "hsl(var(--foreground))" }}>
              Get In Touch
            </h3>

            <div className="space-y-6">
              <a
                href="tel:+14695739471"
                className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <Phone className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest mb-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>PHONE</p>
                  <p className="font-body font-medium" style={{ color: "hsl(var(--foreground))" }}>+1 (469) 573-9471</p>
                </div>
              </a>

              <a
                href="mailto:deccangrillbiryani@gmail.com"
                className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <Mail className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest mb-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>EMAIL</p>
                  <p className="font-body font-medium break-all" style={{ color: "hsl(var(--foreground))" }}>deccangrillbiryani@gmail.com</p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/cTeYh7V545RU3c6S6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--primary) / 0.1)" }}>
                  <MapPin className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="font-label text-xs tracking-widest mb-0.5" style={{ color: "hsl(var(--foreground-muted))" }}>ADDRESS</p>
                  <p className="font-body font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    909 W Spring Creek Pkwy Ste 230,<br />Plano, TX 75023
                  </p>
                </div>
              </a>
            </div>

            <div className="shimmer-divider my-8" />

            {/* Social */}
            <div>
              <p className="font-label text-xs tracking-widest mb-4" style={{ color: "hsl(var(--foreground-muted))" }}>
                FOLLOW US
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/deccangrillplano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                  }}
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <a
                  href="https://instagram.com/deccangrillplano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "hsl(var(--gold) / 0.08)",
                    color: "hsl(var(--gold))",
                    border: "1px solid hsl(var(--gold) / 0.2)",
                  }}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/cTeYh7V545RU3c6S6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 font-body text-sm font-medium transition-all duration-200 hover:gap-3"
              style={{ color: "hsl(var(--primary))" }}
            >
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
