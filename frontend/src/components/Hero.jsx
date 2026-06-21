import { assets } from "../assets/assets"


function Hero() {
  return (
    <div>
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex justify-center items-center py-10 sm:py-0 '>
                <div className='text-[#484848]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#484848]'></p>
                        <p className="text-sm font-medium md:text-base">OUR BESTSELLERS</p>
                    </div>
                    <h1 className="prata-regular text-3xl md-text-5xl leading-relaxed">LATEST ARRIVALS</h1>
                    <div className='flex items-center gap-2'>
                        <p className="text-sm font-medium md:text-base">SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#484848]'></p>
                    </div>
                </div>
            </div>
            {/*HERO RIGHT SIDE */}
            <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero