import { siteConfig } from "@/config/site";
import { Link } from "react-router";
import { Icons } from "../icons";
import NewsLetterForm from "../news-letter";

function Footer() {
  return (
    <footer className="ml-4 w-full border-t lg:ml-0">
      <div className="container mx-auto pt-6 pb-8 lg:py-6">
        <section className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-20">
          <section>
            <Link to="/" className="flex items-center space-x-2">
              <Icons.logo className="size-7" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
            {siteConfig.footerNav.map((navItem) => (
              <div key={navItem.title} className="space-y-2">
                <h3 className="text-sm font-semibold">{navItem.title}</h3>
                <ul className="space-y-1">
                  {navItem.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        to={item.href}
                        target={item.external ? "_blank" : ""}
                        className={
                          "text-muted-foreground hover:text-foreground text-sm"
                        }
                      >
                        {item.title}
                        <span className="sr-only"> {item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section className="space-y-3">
            <h4 className="font-medium">Subscribe to our newsletter</h4>
            <NewsLetterForm />
          </section>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
