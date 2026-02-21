export interface Prediction {
  id: string;
  author: string;
  avatar: string;
  goal: string;
  topic: string;
  deadline: string;
  stake: number;
  yesVotes: number;
  noVotes: number;
  probability: number;
  status: "active" | "resolved_true" | "resolved_false" | "pending_quiz";
  probHistory: number[];
}

export interface FeedItem {
  id: string;
  type: "flashcard" | "mini-quiz" | "concept" | "trending";
  title: string;
  content: string;
  topic: string;
  likes: number;
  challenges: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  accuracy: number;
  points: number;
}

export const predictions: Prediction[] = [
  {
    id: "1",
    author: "Alex Chen",
    avatar: "AC",
    goal: "Master derivatives by tonight",
    topic: "Calculus",
    deadline: "2026-02-21T23:00:00",
    stake: 50,
    yesVotes: 12,
    noVotes: 3,
    probability: 78,
    status: "active",
    probHistory: [50, 55, 60, 65, 70, 72, 75, 78],
  },
  {
    id: "2",
    author: "Maya Rodriguez",
    avatar: "MR",
    goal: "Finish 20 calculus problems",
    topic: "Calculus",
    deadline: "2026-02-21T22:00:00",
    stake: 30,
    yesVotes: 8,
    noVotes: 7,
    probability: 53,
    status: "active",
    probHistory: [50, 48, 52, 55, 50, 51, 53],
  },
  {
    id: "3",
    author: "Jordan Park",
    avatar: "JP",
    goal: "Learn React hooks in 2 hours",
    topic: "Programming",
    deadline: "2026-02-21T20:00:00",
    stake: 75,
    yesVotes: 15,
    noVotes: 2,
    probability: 88,
    status: "active",
    probHistory: [50, 60, 65, 72, 80, 85, 88],
  },
  {
    id: "4",
    author: "Sam Liu",
    avatar: "SL",
    goal: "Memorize 50 Spanish vocab words",
    topic: "Languages",
    deadline: "2026-02-22T18:00:00",
    stake: 40,
    yesVotes: 6,
    noVotes: 9,
    probability: 40,
    status: "active",
    probHistory: [50, 45, 42, 38, 35, 38, 40],
  },
];

export const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "concept",
    title: "Chain Rule in 20 Seconds",
    content: "The chain rule: d/dx[f(g(x))] = f'(g(x)) · g'(x). Think of it as peeling layers of an onion — differentiate the outside, then multiply by the derivative of the inside.",
    topic: "Calculus",
    likes: 234,
    challenges: 45,
  },
  {
    id: "2",
    type: "flashcard",
    title: "What is Big O Notation?",
    content: "Big O describes the upper bound of an algorithm's time complexity. O(n) = linear, O(log n) = logarithmic, O(n²) = quadratic.",
    topic: "CS Fundamentals",
    likes: 189,
    challenges: 67,
  },
  {
    id: "3",
    type: "mini-quiz",
    title: "Quick: Mitochondria Function?",
    content: "What is the primary function of mitochondria in a cell?",
    topic: "Biology",
    likes: 156,
    challenges: 89,
  },
  {
    id: "4",
    type: "trending",
    title: "🔥 Quantum Entanglement Explained",
    content: "Two particles become linked so that measuring one instantly affects the other, regardless of distance. Einstein called it 'spooky action at a distance.'",
    topic: "Physics",
    likes: 412,
    challenges: 123,
  },
  {
    id: "5",
    type: "concept",
    title: "Supply & Demand Basics",
    content: "When price goes up, demand goes down (law of demand). When price goes up, supply goes up (law of supply). Equilibrium is where they meet.",
    topic: "Economics",
    likes: 98,
    challenges: 34,
  },
];

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Alex Chen", avatar: "AC", streak: 42, accuracy: 94, points: 2840 },
  { rank: 2, name: "Maya Rodriguez", avatar: "MR", streak: 38, accuracy: 91, points: 2650 },
  { rank: 3, name: "Jordan Park", avatar: "JP", streak: 35, accuracy: 89, points: 2420 },
  { rank: 4, name: "Sam Liu", avatar: "SL", streak: 28, accuracy: 85, points: 1980 },
  { rank: 5, name: "Taylor Kim", avatar: "TK", streak: 25, accuracy: 82, points: 1750 },
  { rank: 6, name: "Riley Adams", avatar: "RA", streak: 22, accuracy: 80, points: 1620 },
  { rank: 7, name: "Casey Brown", avatar: "CB", streak: 19, accuracy: 78, points: 1480 },
  { rank: 8, name: "Morgan Lee", avatar: "ML", streak: 15, accuracy: 75, points: 1290 },
];

export const quizQuestions = [
  {
    question: "What is the derivative of x²?",
    options: ["x", "2x", "2x²", "x/2"],
    correct: 1,
  },
  {
    question: "What is the chain rule formula?",
    options: [
      "d/dx[f(g(x))] = f'(x) · g'(x)",
      "d/dx[f(g(x))] = f'(g(x)) · g'(x)",
      "d/dx[f(g(x))] = f(g'(x))",
      "d/dx[f(g(x))] = f'(g(x)) + g'(x)",
    ],
    correct: 1,
  },
  {
    question: "What is the integral of 1/x?",
    options: ["x", "ln|x| + C", "1/x² + C", "x² + C"],
    correct: 1,
  },
];
