import amazonBaylogo from "../../assets/imgs/amazon-pay.png";
import amercianExpresslogo from "../../assets/imgs/American-Express-Color.png";
import masterCardlogo from "../../assets/imgs/mastercard.webp";
import payPallogo from "../../assets/imgs/paypal.png";
import AppStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 shadow-sm py-8">
        <div className="container space-y-6">
          {/* Header Section */}
          <header>
            <h2 className="text-xl font-semibold text-slate-800">
              Get the FreshCart App
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on your phone to download the app
            </p>
          </header>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              className="form-control grow px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-primary-800"
              placeholder="Email Address"
            />
            <button className="btn uppercase text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 py-2 px-4 rounded-md">
              Share App Link
            </button>
          </div>

          {/* Partners and Downloads */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-y-2 border-slate-400 border-opacity-50 py-6">
            {/* Payment Partners */}
            <div className="payment-partners flex flex-wrap items-center gap-3">
              <h3 className="text-sm font-medium text-slate-800 mb-2 lg:mb-0">
                Payment Partners
              </h3>
              <img src={amazonBaylogo} className="w-20 md:w-24" alt="Amazon Pay" />
              <img
                src={amercianExpresslogo}
                className="w-20 md:w-24"
                alt="American Express"
              />
              <img
                src={masterCardlogo}
                className="w-16 md:w-20"
                alt="MasterCard"
              />
              <img src={payPallogo} className="w-20 md:w-24" alt="PayPal" />
            </div>

            {/* Download Links */}
            <div className="download flex flex-wrap items-center gap-3">
              <h3 className="text-sm font-medium text-slate-800 mb-2 lg:mb-0">
                Get deliveries with FreshCart
              </h3>
              <img
                src={AppStoreLogo}
                className="w-20 md:w-24"
                alt="App Store"
              />
              <img
                src={googlePlayLogo}
                className="w-[90px] md:w-[110px]"
                alt="Google Play"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
