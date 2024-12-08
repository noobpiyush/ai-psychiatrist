import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Features() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">MindfulAI Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Conversations</CardTitle>
            <CardDescription>Engage in meaningful dialogues with our advanced AI</CardDescription>
          </CardHeader>
          <CardContent>
            Our AI uses natural language processing to understand your concerns and provide empathetic responses.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mood Tracking</CardTitle>
            <CardDescription>Monitor your emotional well-being over time</CardDescription>
          </CardHeader>
          <CardContent>
            Log your daily moods and view trends to gain insights into your mental health patterns.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guided Meditation</CardTitle>
            <CardDescription>Practice mindfulness with our audio-guided sessions</CardDescription>
          </CardHeader>
          <CardContent>
            Choose from a variety of meditation techniques tailored to your current emotional state.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resource Library</CardTitle>
            <CardDescription>Access a wealth of mental health information</CardDescription>
          </CardHeader>
          <CardContent>
            Explore articles, videos, and exercises curated by mental health professionals.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

