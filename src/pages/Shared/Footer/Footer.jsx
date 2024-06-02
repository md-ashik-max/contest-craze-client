import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";


const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <aside>
                    <img className="w-32 h-32" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                    <h3 className="text-4xl font-black font-roboto">Contest <span className="text-[#0677A1]">Craze</span></h3>
                    <div className="flex gap-4 text-xl">
                        <FaFacebook></FaFacebook>
                        <FaInstagram></FaInstagram>
                        <FaTwitter></FaTwitter>
                        <LiaLinkedin></LiaLinkedin>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                            <button className="btn bg-[#0677A1] text-white hover:text-black join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>

            </footer>
            <div className="p-4 bg-[#0677A1] text-center font-bold">
                <p className="text-white opacity-100">Copyright © 2024 - All right reserved by Contest Craze</p>
            </div>
        </div>
    );
};

export default Footer;