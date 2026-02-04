'use client';

import { getSocialLinks, loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: false, // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const userConfig = await loadUserConfig();
        setConfig(userConfig);
      } catch (error) {
        console.error('Failed to load user configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if botcheck is true, it's a bot
    if (formData.botcheck) {
      // Silently fail for bots
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const provider = config?.contactForm?.provider || 'web3forms';
      const payload: any = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        provider,
      };

      // Add provider-specific configuration
      // Note: Web3Forms access key is handled server-side via environment variables for security
      if (provider === 'generic') {
        payload.genericApiEndpoint = config?.contactForm?.genericApiEndpoint;
        payload.genericApiHeaders = config?.contactForm?.genericApiHeaders;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: false });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!config) {
    return (
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load contact section configuration</p>
          </div>
        </div>
      </section>
    );
  }

  const contactConfig = config.content.contact || {
    title: 'Get In Touch',
    subtitle: 'Have a project in mind or want to collaborate?',
    description: "I'm always interested in new opportunities and exciting projects.",
    email: config.personal.email.replace('mailto:', ''),
    phone: '+1 (555) 123-4567',
    location: config.personal.location,
    formTitle: 'Send a Message',
    formDescription: 'Fill out the form below and I\'ll get back to you as soon as possible.',
  };

  const socialLinks = getSocialLinks(config);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
    },
    {
      icon: Phone,
      title: 'Phone',
      value: contactConfig.phone,
      href: `tel:${contactConfig.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: MapPin,
      title: 'Location',
      value: contactConfig.location,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {contactConfig.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {contactConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {contactConfig.description}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-200">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{info.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{contactConfig.formTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300">{contactConfig.formDescription}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="checkbox"
                name="botcheck"
                checked={formData.botcheck}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  maxLength={5000}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formData.message.length} / 5000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg">
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
                  {errorMessage || 'Sorry, there was an error sending your message. Please try again or contact me directly.'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
