import { Github, Heart, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: Linkedin },
    { name: 'Email', href: 'mailto:your.email@example.com', icon: Mail },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Your Name</span>
            </div>
            <p className="text-gray-600 max-w-sm">
              Full-stack developer passionate about creating innovative solutions and sharing knowledge through code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
