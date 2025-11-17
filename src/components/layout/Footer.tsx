import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50" style={{ borderColor: '#DCDCDC' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/pricing" className="hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-gray-900">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600" style={{ borderColor: '#DCDCDC' }}>
          <p>&copy; {new Date().getFullYear()} SEO & Paid Ad Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

