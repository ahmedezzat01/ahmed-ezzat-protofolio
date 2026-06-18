import React from "react";

const Globe: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes earthRotate { 0% { background-position: 0 0; } 100% { background-position: 400px 0; } }
        @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
      `}</style>
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80')", backgroundSize: "cover", backgroundPosition: "left", animation: "earthRotate 30s linear infinite" }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{ left: `${[ -20, -40, 350, 200, 50, 250, 290][i]}px`, top: `${[null, 30, 90, 290, 270, -50, 60][i]}px`, animation: `${['twinkling','twinkling-slow','twinkling-long','twinkling','twinkling-fast','twinkling-long','twinkling-slow'][i]} ${[3,2,4,3,1.5,4,2][i]}s infinite` }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Globe;
