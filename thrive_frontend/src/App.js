import React, { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Head from './components/Heads';
import Footer from './components/Footers';
import thriveArt from './assets/thriveArt2.png';
import SidePanel from './components/SidePanel';

function App() {  

  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  });

  function handlerRegister() {
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      location.href = "/colleges";
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
  
  <div className="h-full mt-10 flex flex-col  bg-gradient-to-b from-[#070a52] to-[#a6b6c6]">
    <Head />
    <div className="mt-10 flex flex-col max-w-4xl p-8 mx-auto rounded-lg mb-10 items-center w-1/2 ">
      <p className="mt-10 text-1xl text-[#a6b6c6] font-bold mb-2">SOBRE A THRIVE</p>
      <h1 className="mt-10 text-8xl font-bold text-[#a6b6c6] mb-10 text-center w-2/3">Conexão que muda o mundo</h1>
      <div className="overflow-y-auto max-h-96"></div>
    </div>
    <div className="max-w-4xl p-8 mx-auto rounded-lg ">
      <div className="overflow-y-auto max-h-96">

      </div>
    </div>

    <div className="h-full w-full mt-10 flex flex-col items-center justify-center">
      <div className="mt-10 flex flex-col max-w-4xl p-8 mx-auto rounded-lg mb-20 items-center justify-center">
        <p className="mt-10 text-4xl text-[#070a52] font-bold mb-10">SOBRE A THRIVE</p>
        <h1 className="text-2xl mb-4 text-[#070a52] text-center w-2/3">Somos uma plataforma revolucionária que possibilita aos estudantes solicitarem bolsas de estudo e o conecta com investidores.</h1>      
        <p className="mt-10 text-3xl text-[#070a52] italic mb-10">"Aqui seu investimento pode mudar vidas"</p>
        <Button type="Submit" name="Seja Bolsista >" />
            {/* <SidePanel panelContent={<div>Content for side panel goes here</div>}>
              Open Side Panel
            </SidePanel> */}
        <Button type="Submit" name="Invista >" onClick={handlerRegister} />
        <div className="overflow-y-auto max-h-96"></div>
      </div>

    </div>
    <Footer />
  </div>
  );
};


export default App;