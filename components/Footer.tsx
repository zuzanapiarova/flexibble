import Image from 'next/image'
import Link from 'next/link'
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants'
import { footerLinks } from '@/constants'
import { StringLiteralType } from 'typescript'

type ColumnProps = {
    title: string;
    links: Array<string>;
}

//utility component that we can reuse for styling links in columns at the bottom: 
const FooterColumn = ({ title, links }: ColumnProps) => {
    return(
        <div className='footer_column'>
            <h4 className='font-semibold'>{title}</h4>
            <ul className='flex flex-col gap-2 font-normal'>
                {links.map((link) => (
                    <Link href='/' key={link}>{link}</Link>
                ))}
            </ul>
        </div>
    )
}

const Footer = () => {
  return (
    <footer className='flexStart footer'>
        <div className="flex flex-col gap-12 w-full">
            <div className='flex items-start flex-col'>
                <Image src='./logo-purple.svg' width={115} height={83} alt='flexibble'/>
                <p className='textStart text-sm font-normal mt-5 max-w-xs'>
                    Flexibble is the world's leading community for developers to share, grow, and get hired. 
                </p>
            </div>
            <div className="flex flex-wrap gap-12">
                <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>

                <div className='flex flex-1 flex-col gap-4'>
                    <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links}/>
                    <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links}/>
                </div>

                <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}/>

                <div className='flex flex-1 flex-col gap-4'>
                    <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links}/>
                    <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links}/>
                </div>

                <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}/>
            </div>
        </div>
        <div className="flex-between footer_copyright">
            <p>&copy;2023 Flexibble. All rights reserved.</p>
            <p className='text-gray'><span className='text-black font-semibold'>10214 Projects submitted.</span></p>
        </div>
    </footer>
  )
}

export default Footer