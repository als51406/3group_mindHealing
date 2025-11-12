import TextFXHeadline from './TextFXHeadline';

export default function Text() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      color: '#000',
      fontFamily: 'MomentKkukkkuk, sans-serif'
    }}>
      <TextFXHeadline 
        text="토닥톡"
        align="center"
        glow={false}
        highlightColor="#000000"
        darkGlowColor="rgba(0,0,0,0.05)"
      />
    </div>
  );
}

