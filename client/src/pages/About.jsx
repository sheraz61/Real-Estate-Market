import React from 'react';

function About() {
  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center px-6'>
      <div className='max-w-4xl w-full'>
        <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold text-slate-700 mb-4'>
              About <span className='text-transparent bg-clip-text bg-linear-to-r from-gray-700 to-gray-500'>Sheraz Estate</span>
            </h1>
            <div className='w-24 h-1 bg-linear-to-r from-gray-700 to-gray-500 mx-auto rounded-full'></div>
          </div>

          {/* Content */}
          <div className='space-y-6 text-slate-700 leading-relaxed'>
            <p className='text-lg'>
              Sheraz Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
            </p>

            <p className='text-lg'>
              Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
            </p>

            <p className='text-lg'>
              Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
            </p>
          </div>

        
        </div>
      </div>
    </div>
  );
}

export default About;