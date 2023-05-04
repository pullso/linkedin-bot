export const messages = [
  `Hello NAME! Your experience in tech recruitment caught my attention. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new challenges to grow my skills. Let's explore opportunities.`,
  `Hi there NAME! Your expertise in tech recruitment caught my eye. As a frontend dev, I'm passionate about creating engaging web experiences and always seeking new opportunities to grow. Let's connect and explore possibilities.`,
  `Greetings NAME! Your focus on tech recruitment stood out to me. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new challenges to create high-performing web experiences. Let's connect and explore possibilities.`,
  `Hi NAME! Your skills in tech recruitment stood out to me. As a frontend dev, I'm passionate about creating engaging web experiences and seeking new opportunities. Let's connect and discuss further.`,
  `Hello there NAME! Your expertise in tech recruitment is impressive. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new opportunities to create high-performing web experiences. Let's connect and explore possibilities together.`,
  `Hi NAME! Your focus on tech recruitment caught my eye. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new challenges to grow my skills and create engaging web experiences. Let's connect and explore further.`,
  `Greetings NAME! I noticed your skills in tech recruitment and wanted to connect. As a frontend dev, I'm passionate about creating high-performing web experiences and seeking new challenges. Let's connect and explore opportunities to work together.`,
  `Hello NAME! Your experience in tech recruitment is impressive. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new opportunities to grow my skills and create engaging web experiences. Let's explore possibilities together.`,
  `Hi there NAME! Your expertise in tech recruitment caught my eye. As a frontend dev, I'm passionate about creating high-performing web experiences and seeking new opportunities to grow. Let's connect and explore possibilities.`,
  `Hello there NAME! Your focus on tech recruitment is impressive. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new challenges to grow my skills and create engaging web experiences. Let's connect and explore further.`,
  `Hey NAME! Your experience in tech recruitment stood out to me. As a frontend dev, I'm always looking for new challenges and opportunities to grow. Let's connect and explore how we can work together.`,
  `Hi there NAME! Your expertise in tech recruitment is impressive. As a frontend dev, I'm passionate about creating high-quality web experiences and always seeking new opportunities. Let's connect and explore possibilities.`,
  `Greetings NAME! I came across your profile and your focus on tech recruitment caught my eye. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new challenges. Let's connect and see how we can collaborate.`,
  `Hi NAME! Your skills in tech recruitment are impressive. As a frontend dev, I'm constantly seeking new challenges and opportunities to improve my skills. Let's connect and discuss how we can work together.`,
  `Hello there NAME! Your experience in tech recruitment is interesting. As a frontend dev, I'm passionate about creating engaging web experiences and always looking for new opportunities to grow. Let's connect and explore possibilities together.`,
  `Hey NAME! I noticed your focus on tech recruitment and wanted to connect. As a frontend dev, I'm always seeking new challenges and opportunities to create high-performing web experiences. Let's connect and explore how we can work together.`,
  `Hi there NAME! Your expertise in tech recruitment caught my attention. As a frontend dev, I'm constantly seeking new challenges and opportunities to improve my skills. Let's connect and explore possibilities.`,
  `Greetings NAME! Your skills in tech recruitment stood out to me. As a frontend dev, I'm passionate about creating high-quality web experiences and seeking new opportunities to grow. Let's connect and explore how we can work together.`,
  `Hello NAME! Your focus on tech recruitment caught my eye. As a frontend dev, I'm always looking for new challenges and opportunities to create engaging web experiences. Let's connect and explore possibilities together.`,
  `Hi NAME! Your experience in tech recruitment is impressive. As a frontend dev, I'm interested in connecting with hiring professionals and seeking new opportunities to grow my skills. Let's connect and see how we can work together.`,
];
export function getConnectionMessage(name) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex].replace('NAME', name)
}
