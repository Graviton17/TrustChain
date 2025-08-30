const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Call to Action */}
        <div className="text-center mb-12">
          <h3 className="text-3xl text-white mb-4">Ready to revolutionize your subsidy program?</h3>
          {/* BACKEND_CONNECTIVITY: This button would open a modal with a contact form or lead to a scheduling page (e.g., Calendly). */}
          <button className="bg-gold text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-dark transition-colors">
            Speak with Specialist
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-gray-800 pt-12">
          {/* Column 1: TrustChain */}
          <div>
            <h4 className="font-bold text-white mb-4">TrustChain</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  About TrustChain
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Our Vision
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Leadership Team
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Investor Relations
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2: Platform */}
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Blockchain Technology
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Smart Contracts
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  AI Solutions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Security Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3: Solutions */}
          <div>
            <h4 className="font-bold text-white mb-4">Solutions</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Government Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Enterprise Solutions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Startup Programs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Integration Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Custom Development
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4: Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Knowledge Base
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Video Library
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Webinar Series
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Research Reports
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Developer Tools
                </a>
              </li>
            </ul>
          </div>
          {/* Column 5: Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  24/7 Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Live Chat Support
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Regional Offices
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Partner Network
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-electric-green">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm flex flex-col sm:flex-row justify-between items-center">
          <p>© 2025 TrustChain. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span>ISO 27001</span>
            <span>SOC 2</span>
            <span>GDPR</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
