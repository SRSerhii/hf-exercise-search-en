"use client";
import '../app/page.css';
import Link from "next/link"
import Image from "next/image"
import wfpImg from '../public/wayforpay_1568625809_payment_methods_1.png';
import { Send } from "lucide-react"


export default function LandingPage() {

  return (
    <div className="flex flex-col mt-10">
      {/* Footer Section */}
      <footer className="w-full py-12 md:py-16 bg-green-50 text-green-400">
        <div className="w-full mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              {/*}
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
                  <div className="absolute inset-0 flex items-center justify-center text-green-700 font-bold text-lg">
                    N
                  </div>
                </div>
                <span className="font-bold text-xl">Serhii Shevchenko</span>
              </Link>
              */}

              <h3 className="text-xl font-medium text-green-600">Contacts</h3>

              <Link href="mailto:serhii@serhiishevchenko.com" className="text-blue-400 hover:text-blue-600 transition-colors">
                Email: serhii@serhiishevchenko.com
              </Link>
              <div className="flex space-x-4">
                <Link href="https://t.me/serhii_shevchenko1" className="flex items-center gap-2 text-blue-400 hover:text-blue-600">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Telegram</span>
                  Telegram
                </Link>

              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-green-600">Legal</h3>
              <ul className="space-y-2 text-md">
                <li>
                  <Link href="https://serhiishevchenko.com/privacy-policy/" className="text-blue-400 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="https://serhiishevchenko.com/terms-of-service/" className="text-blue-400 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
              <Image src={wfpImg} alt="WayForPay payment engine logo" width="400" height="80" className="payment-logos" />

            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-green-600">Disclaimer</h3>
              <p className="text-sm text-green-600">
                Results vary depending on your starting point, goals and effort in following the steps provided in this website{"'"}s materials.
                The contents on this website are for informational purposes only, and are not intended to diagnose, prevent or treat any medical condition,
                replace the advice of a healthcare professional, or provide any medical advice, diagnosis, or treatment. Please consult your medical advisor
                before making any changes to your diet or lifestyle.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 text-center text-sm text-green-600">
            <p>© {new Date().getFullYear()} Serhii Shevchenko. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
