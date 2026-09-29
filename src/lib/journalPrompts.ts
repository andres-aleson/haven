/**
 * Specific, concrete journal prompts — deliberately not generic ("write
 * about your day") so "generate me a prompt" feels worth clicking more
 * than once.
 */
export const JOURNAL_PROMPTS: string[] = [
  "What's one thing that felt heavier than it should have today?",
  "Describe a moment this week when you felt like yourself, even for a few minutes.",
  "What's a worry that's been looping in your head? Write it down so it's not just stuck up there.",
  "Who's one person who makes you feel like you don't have to perform? What is it about them?",
  "What's something you did today that your younger self would be proud of?",
  "If your anxiety had a voice, what is it saying to you right now? What would you say back?",
  "What's a small thing that went right today that you almost didn't notice?",
  "Describe the last time you laughed so hard you forgot what you were stressed about.",
  "What's a rule you hold yourself to that you'd never expect from a friend?",
  "What does your body feel like right now? Where are you holding tension?",
  "What's something you're pretending is fine, but actually isn't?",
  "Write about a place — real or imagined — where you feel completely safe.",
  "What's one thing you wish someone would just ask you about?",
  "What did you used to love doing that you haven't done in a while? Why did it stop?",
  "What's a compliment you received that you didn't fully believe? Why not?",
  "If today had a title, like a chapter in a book, what would it be called?",
  "What's something you're avoiding thinking about? You don't have to solve it — just name it.",
  "Describe someone who has never made you feel judged. What do they do differently?",
  "What's a mistake you're still replaying? What would you tell a friend who made the same one?",
  "What's something about your life right now that you have zero control over? How does it feel to write that down?",
  "What's a text or message you've wanted to send but haven't?",
  "Write about the version of you five years from now. What do you hope they've figured out?",
  "What's the difference between how you talk to yourself and how you talk to people you love?",
  "What's something small that would make tomorrow easier?",
  "Describe a sound, smell, or feeling that instantly calms you down.",
  "What's a boundary you know you need but haven't set yet?",
  "Who do you compare yourself to most? What do you think they don't struggle with — but probably do?",
  "What's something you accomplished today that had nothing to do with being productive?",
  "If you could tell one adult in your life exactly how you're feeling, what would you want them to understand?",
  "What's a fear that feels embarrassing to admit out loud?",
  "Describe a moment today when you felt completely unseen.",
  "What's something you needed to hear today that no one said?",
  "What's a habit or thought pattern you're trying to unlearn?",
  "Write about the last time you felt proud of how you handled something hard.",
  "What does 'okay' actually feel like in your body, versus 'not okay'?",
  "What's something you're carrying that isn't even yours to carry?",
  "Describe a friendship that changed shape recently. How do you feel about that?",
  "What's one thing you'd want to redo about today, and one thing you wouldn't change at all?",
  "What's a thought that keeps showing up uninvited? Where do you think it comes from?",
  "What does your ideal 'nothing day' look like — no plans, no pressure?",
  "What's something you're scared people would think less of you for?",
  "Write about a time an adult let you down. What did you need instead?",
  "What's a small act of kindness — from you or to you — that you haven't forgotten?",
  "If you had to describe today in one color, what would it be and why?",
  "What's something you know about yourself now that you didn't a year ago?",
  "What's a question you wish someone would ask you, instead of 'are you okay?'",
  "Describe a time you set a boundary and it actually felt good.",
  "What's something that used to feel impossible that doesn't scare you as much anymore?",
  "What's a part of your day you rushed through that you wish you'd slowed down for?",
  "Write a note to yourself for the next time this feeling comes back.",
  "What's something you need permission to feel right now?",
  "Describe the last time someone really listened to you, without trying to fix it.",
  "What's a story you tell yourself about why you're 'too much' or 'not enough'? Is it true?",
  "What's one thing that's been quietly good about this week, even if the rest was hard?",
  "If today was a weather forecast, what would it say?",
];

export function getRandomPrompt(exclude?: string): string {
  const pool = exclude
    ? JOURNAL_PROMPTS.filter((p) => p !== exclude)
    : JOURNAL_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
