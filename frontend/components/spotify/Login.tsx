'use client';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes eq {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }

        .animate-drift   { animation: drift 12s ease-in-out infinite alternate; }
        .animate-drift-2 { animation: drift 12s ease-in-out infinite alternate; animation-delay: -4s; }
        .animate-drift-3 { animation: drift 12s ease-in-out infinite alternate; animation-delay: -8s; }

        .afu   { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-1 { animation: fadeUp 0.7s 0.10s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-2 { animation: fadeUp 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-3 { animation: fadeUp 0.7s 0.20s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-4 { animation: fadeUp 0.7s 0.28s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-5 { animation: fadeUp 0.7s 0.33s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-6 { animation: fadeUp 0.7s 0.38s cubic-bezier(0.16,1,0.3,1) both; }
        .afu-7 { animation: fadeUp 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both; }

        .eq-bar {
          width: 3px;
          background: #000;
          border-radius: 2px;
          animation: eq 0.8s ease-in-out infinite alternate;
        }
        .eq-bar:nth-child(1) { height: 6px;  animation-delay: 0s; }
        .eq-bar:nth-child(2) { height: 10px; animation-delay: 0.15s; }
        .eq-bar:nth-child(3) { height: 14px; animation-delay: 0.3s; }
        .eq-bar:nth-child(4) { height: 8px;  animation-delay: 0.1s; }

        .login-btn:hover  {
          background: #22d35f;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(29,185,84,0.5);
        }
        .login-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 12px rgba(29,185,84,0.3);
        }
      `}</style>

      {/* Page */}
      <div className="font-dm relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-[#0a0a0a] px-6 py-8 text-[#f0f0f0] md:py-12">

        {/* Ambient blobs */}
        <div className="animate-drift pointer-events-none fixed left-[-10%] top-[-10%] h-[clamp(260px,50vw,520px)] w-[clamp(260px,50vw,520px)] rounded-full bg-[#1DB954] opacity-[0.18] blur-[80px]" />
        <div className="animate-drift-2 pointer-events-none fixed bottom-[5%] right-[-8%] h-[clamp(180px,35vw,360px)] w-[clamp(180px,35vw,360px)] rounded-full bg-[#8b5cf6] opacity-[0.18] blur-[80px]" />
        <div className="animate-drift-3 pointer-events-none fixed bottom-[30%] left-[10%] h-[clamp(120px,20vw,240px)] w-[clamp(120px,20vw,240px)] rounded-full bg-[#1DB954] opacity-10 blur-[80px]" />

        {/* Noise overlay */}
        <div
          className="pointer-events-none fixed inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Card */}
        <div
          className="afu relative z-10 w-full max-w-[460px] rounded-[2rem] border border-white/[0.08] backdrop-blur-2xl md:rounded-[2.5rem]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            padding: 'clamp(2.5rem,8vw,4rem) clamp(2rem,6vw,3.5rem)',
            boxShadow: '0 0 0 1px rgba(29,185,84,0.08), 0 40px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Logo */}
          <div className="afu-1 mb-10 flex items-center justify-center gap-2.5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1DB954]"
              style={{ boxShadow: '0 0 24px rgba(29,185,84,0.5)' }}
            >
              <div className="flex h-[14px] items-end gap-[2px]">
                <div className="eq-bar" />
                <div className="eq-bar" />
                <div className="eq-bar" />
                <div className="eq-bar" />
              </div>
            </div>
            <span className="font-syne text-[1.35rem] font-extrabold tracking-tight text-white">
              MySpotify
            </span>
          </div>

          {/* Heading */}
          <h1 className="afu-2 font-syne mb-3 text-center font-extrabold leading-[1.1] tracking-tighter" style={{ fontSize: 'clamp(2rem,6vw,2.6rem)' }}>
            Your music,<br />
            <span className="text-[#1DB954]">your world.</span>
          </h1>

          <p className="afu-3 mb-10 text-center text-[0.95rem] leading-relaxed text-[#888]">
            Connect your Spotify account to unlock<br />
            personalized playlists and insights.
          </p>

          {/* Button */}
          <div className="afu-4">
            <button
              className="login-btn font-dm flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-none bg-[#1DB954] px-8 py-4 font-bold tracking-wide text-black transition-[background,box-shadow] duration-200"
              style={{
                fontSize: 'clamp(0.95rem,2.5vw,1.05rem)',
                boxShadow: '0 4px 24px rgba(29,185,84,0.35)',
              }}
              onClick={handleLogin}
            >
              <svg className="h-5 w-5 shrink-0 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Continue with Spotify
            </button>
          </div>

          {/* Divider */}
          <div className="afu-5 my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-[0.8rem] uppercase tracking-widest text-[#888]">what you get</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          {/* Features */}
          <div className="afu-6 flex flex-col gap-2.5">
            {[
              "Personalized listening stats & insights",
              "Smart playlist recommendations",
              "Top tracks, artists & genres",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[0.875rem] text-[#888]">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1DB954] opacity-80" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="afu-7 relative z-10 mt-8 text-center text-[0.75rem] tracking-wide text-white/20">
          Not affiliated with Spotify AB · For personal use only
        </div>
      </div>
    </>
  );
}