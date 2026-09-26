import Image from "next/image"
import headshot from "../public/assets/headshot.jpg"
import { instrumentSans } from "../lib/fonts"
import Markdown from "./markdown"

const linkClass = "underline text-link hover:opacity-70 duration-200 transition-opacity"

type Props = {
  bio: string
}

const Intro = ({ bio }: Props) => {
  return (
    <div className="max-w-4xl mb-6">
      <section className="flex items-center mt-4 mb-8 px-8 md:px-16">
        <div className="flex-none max-w-sm">
          <Image
            src={headshot}
            alt={`Headshot of Xiaorui Liu`}
            width={112}
            height={112}
            className="rounded-full w-28 h-28 object-cover border border-black"
            priority
          />
        </div>
        <div className="grow pl-5 self-center">
          <h1 className={`${instrumentSans.className} text-navy text-left text-[32px] leading-tight tracking-tight`}>
            Xiaorui Liu
          </h1>
          <h4 className="text-left text-[15px] mt-1">
            CS PhD Student at the University of Pennsylvania (advisor: <a
              href="https://andrewhead.info"
              className={linkClass}
            >
              Andrew Head
            </a>)
          </h4>

          <p className="text-left text-[15px] mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {/* TODO: point href at the CV PDF once it's added */}
            <a className="inline-flex items-center gap-1.5 text-link hover:opacity-70 duration-200 transition-opacity cursor-pointer">
              <Image className="w-3" unoptimized width={12} height={12} src={"/assets/icons/cv.svg"} alt={"A CV Icon"}></Image>
              <span className="underline">CV</span>
            </a>
            <a href="mailto:xrl@seas.upenn.edu" className="inline-flex items-center gap-1.5 text-link hover:opacity-70 duration-200 transition-opacity">
              <Image className="w-3" unoptimized width={12} height={12} src={"/assets/icons/email.svg"} alt={"An Email Icon"}></Image>
              <span className="underline">xrl@seas.upenn.edu</span>
            </a>
            <a href="https://github.com/xiaoruiyliu" className="inline-flex items-center gap-1.5 text-link hover:opacity-70 duration-200 transition-opacity">
              <Image className="w-3" unoptimized width={12} height={12} src={"/assets/icons/github.svg"} alt={"A Github Icon"}></Image>
              <span className="underline">Github</span>
            </a>
          </p>
        </div>
      </section>

      <section className="px-8 md:px-16 mt-4">
        <div className="text-justify hyphens-auto text-[17px] mt-5 font-extralight">
          <Markdown>{bio}</Markdown>
        </div>
      </section>
    </div>
  )
}

export default Intro
