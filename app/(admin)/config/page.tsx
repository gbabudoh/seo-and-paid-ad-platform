import Card from '@/src/components/ui/Card';

export default function AdminConfigPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Platform Configuration</h1>
      <p className="mt-4 text-gray-600">Manage platform settings and API configurations.</p>
      <div className="mt-8 space-y-6">
        <Card>
          <Card.Header>
            <Card.Title>API Keys</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">Manage API credentials for external services.</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Platform Settings</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">Configure platform-wide settings.</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

