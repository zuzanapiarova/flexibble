import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import AuthProviders from './AuthProviders';

const Navbar = () => {

    const session = {};

  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href='/'>
                <Image src='/logo.svg' width={115} height={43} alt='flexibble' />
            </Link>
            <ul className='xl:flex hidden text-small gap-7'>
                { NavLinks.map((link) => (
                    <Link href={link.href} key={link.key}>{link.text}</Link>

                ))}
            </ul>
        </div>
        <div className='flex-center gap-4'>
            {//under: when session is open, we can either sign in or show the profile picture and button to add work
            session ? (
                <>
                    <Image src='' alt='pic'/>
                    <Link href='/create-project'>Share work</Link>
                </>
            ) : (
                < AuthProviders />
            )
            }
        </div>
    </nav>
  )
}

export default Navbar