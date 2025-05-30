"use client"

import React from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Progress,
  Select,
  SelectItem,
  Skeleton,
  Switch,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  TextArea,
} from "@bun-ui/react"
import {
  Bell,
  CheckCircle,
  CreditCard,
  Globe,
  Lock,
  Palette,
  User,
  Zap,
} from "lucide-react"

const settings = {
  profile: {
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    timezone: "UTC-8",
    bio: "Senior Product Manager with 8+ years of experience in SaaS products",
    company: "Acme Inc.",
    department: "Product",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    language: "en",
  },
  notifications: {
    email: {
      enabled: true,
      frequency: "immediate",
      types: {
        taskUpdates: true,
        mentions: true,
        comments: true,
        security: true,
      },
    },
    push: {
      enabled: false,
      types: {
        taskUpdates: true,
        mentions: true,
        comments: false,
        security: true,
      },
    },
    marketing: {
      enabled: false,
      types: {
        newsletters: false,
        promotions: false,
        updates: true,
      },
    },
    updates: {
      enabled: true,
      frequency: "weekly",
    },
  },
  appearance: {
    theme: "light",
    fontSize: "medium",
    compactMode: false,
    accentColor: "blue",
    sidebarPosition: "left",
    animations: true,
    reducedMotion: false,
    highContrast: false,
  },
  security: {
    twoFactor: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginHistory: [
      {
        date: "2024-03-15T10:30:00",
        device: "MacBook Pro",
        location: "San Francisco, CA",
        ip: "192.168.1.1",
      },
      {
        date: "2024-03-14T15:45:00",
        device: "iPhone 13",
        location: "San Francisco, CA",
        ip: "192.168.1.2",
      },
    ],
    activeSessions: 2,
  },
  billing: {
    plan: "pro",
    status: "active",
    nextBillingDate: "2024-04-15",
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
      expiry: "12/25",
    },
    usage: {
      storage: 75,
      users: 8,
      apiCalls: 10000,
    },
  },
  integrations: {
    github: {
      connected: true,
      username: "johndoe",
    },
    slack: {
      connected: true,
      workspace: "acme-inc",
    },
    google: {
      connected: false,
    },
  },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("profile")
  const [isSaving, setIsSaving] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {showSuccess && (
        <Alert className="mb-6" variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your settings have been saved successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Appearance
                </Button>
                <Button
                  variant={activeTab === "security" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button
                  variant={activeTab === "billing" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button
                  variant={activeTab === "language" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("language")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Language & Region
                </Button>
                <Button
                  variant={activeTab === "integrations" ? "contained" : "text"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("integrations")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Integrations
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabList>
              <TabTrigger value="profile">Profile</TabTrigger>
              <TabTrigger value="notifications">Notifications</TabTrigger>
              <TabTrigger value="appearance">Appearance</TabTrigger>
              <TabTrigger value="security">Security</TabTrigger>
              <TabTrigger value="billing">Billing</TabTrigger>
              <TabTrigger value="language">Language</TabTrigger>
              <TabTrigger value="integrations">Integrations</TabTrigger>
            </TabList>

            <TabContent value="profile">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Profile Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Update your personal information and preferences
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input defaultValue={settings.profile.name} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue={settings.profile.email} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Input defaultValue={settings.profile.role} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input defaultValue={settings.profile.company} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input defaultValue={settings.profile.department} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input defaultValue={settings.profile.location} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue={settings.profile.phone} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timezone</label>
                      <Select defaultValue={settings.profile.timezone}>
                        <SelectItem value="UTC-8">
                          Pacific Time (UTC-8)
                        </SelectItem>
                        <SelectItem value="UTC-5">
                          Eastern Time (UTC-5)
                        </SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                        <SelectItem value="UTC+1">
                          Central European Time (UTC+1)
                        </SelectItem>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <TextArea defaultValue={settings.profile.bio} rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="notifications">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    Notification Preferences
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Configure how you want to receive notifications
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-muted-foreground text-sm">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        defaultChecked={settings.notifications.email.enabled}
                      />
                    </div>
                    {settings.notifications.email.enabled && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">
                              Task Updates
                            </h5>
                            <p className="text-muted-foreground text-xs">
                              Get notified about task changes
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.email.types.taskUpdates
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">Mentions</h5>
                            <p className="text-muted-foreground text-xs">
                              Get notified when someone mentions you
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.email.types.mentions
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">Comments</h5>
                            <p className="text-muted-foreground text-xs">
                              Get notified about new comments
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.email.types.comments
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-muted-foreground text-sm">
                          Receive push notifications
                        </p>
                      </div>
                      <Switch
                        defaultChecked={settings.notifications.push.enabled}
                      />
                    </div>
                    {settings.notifications.push.enabled && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">
                              Task Updates
                            </h5>
                            <p className="text-muted-foreground text-xs">
                              Get notified about task changes
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.push.types.taskUpdates
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">Mentions</h5>
                            <p className="text-muted-foreground text-xs">
                              Get notified when someone mentions you
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.push.types.mentions
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-muted-foreground text-sm">
                          Receive marketing and promotional emails
                        </p>
                      </div>
                      <Switch
                        defaultChecked={
                          settings.notifications.marketing.enabled
                        }
                      />
                    </div>
                    {settings.notifications.marketing.enabled && (
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">Newsletters</h5>
                            <p className="text-muted-foreground text-xs">
                              Receive our weekly newsletter
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.marketing.types.newsletters
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium">Promotions</h5>
                            <p className="text-muted-foreground text-xs">
                              Receive special offers and promotions
                            </p>
                          </div>
                          <Switch
                            defaultChecked={
                              settings.notifications.marketing.types.promotions
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="appearance">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Appearance Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Customize how the application looks and feels
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <Select defaultValue={settings.appearance.theme}>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font Size</label>
                    <Select defaultValue={settings.appearance.fontSize}>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Accent Color</label>
                    <Select defaultValue={settings.appearance.accentColor}>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Sidebar Position
                    </label>
                    <Select defaultValue={settings.appearance.sidebarPosition}>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Animations</h4>
                      <p className="text-muted-foreground text-sm">
                        Enable interface animations
                      </p>
                    </div>
                    <Switch defaultChecked={settings.appearance.animations} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reduced Motion</h4>
                      <p className="text-muted-foreground text-sm">
                        Minimize motion and animations
                      </p>
                    </div>
                    <Switch
                      defaultChecked={settings.appearance.reducedMotion}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High Contrast</h4>
                      <p className="text-muted-foreground text-sm">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch defaultChecked={settings.appearance.highContrast} />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="security">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage your account security and privacy
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-muted-foreground text-sm">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch defaultChecked={settings.security.twoFactor} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Session Timeout (minutes)
                    </label>
                    <Select defaultValue={settings.security.sessionTimeout}>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Password Expiry (days)
                    </label>
                    <Select defaultValue={settings.security.passwordExpiry}>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Active Sessions</h4>
                    <div className="space-y-4">
                      {settings.security.loginHistory.map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-muted-foreground text-sm">
                              {new Date(session.date).toLocaleString()} •{" "}
                              {session.location}
                            </p>
                          </div>
                          <Button variant="outlined" size="sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="billing">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Billing Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage your subscription and payment methods
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Current Plan</h4>
                        <p className="text-muted-foreground text-sm">
                          Pro Plan • $
                          {settings.billing.plan === "pro" ? "29" : "99"}/month
                        </p>
                      </div>
                      <Button variant="outlined">Upgrade Plan</Button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Payment Method
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border p-4">
                        <CreditCard className="h-5 w-5" />
                        <span>
                          •••• {settings.billing.paymentMethod.last4} • Expires{" "}
                          {settings.billing.paymentMethod.expiry}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Usage</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Storage</span>
                            <span className="text-sm">
                              {settings.billing.usage.storage}%
                            </span>
                          </div>
                          <Progress value={settings.billing.usage.storage} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Users</span>
                            <span className="text-sm">
                              {settings.billing.usage.users}/10
                            </span>
                          </div>
                          <Progress
                            value={(settings.billing.usage.users / 10) * 100}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">API Calls</span>
                            <span className="text-sm">
                              {settings.billing.usage.apiCalls}/10000
                            </span>
                          </div>
                          <Progress
                            value={settings.billing.usage.apiCalls / 100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="language">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Language & Region</h3>
                  <p className="text-muted-foreground text-sm">
                    Customize your language and regional preferences
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select defaultValue={settings.profile.language}>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Format</label>
                    <Select defaultValue="MM/DD/YYYY">
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Format</label>
                    <Select defaultValue="12h">
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent value="integrations">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Connected Services</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage your connected third-party services
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton
                          variant="rectangular"
                          width="3rem"
                          height="3rem"
                        />
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-muted-foreground text-sm">
                            Connected as {settings.integrations.github.username}
                          </p>
                        </div>
                      </div>
                      <Button variant="outlined" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton
                          variant="rectangular"
                          width="3rem"
                          height="3rem"
                        />
                        <div>
                          <h4 className="font-medium">Slack</h4>
                          <p className="text-muted-foreground text-sm">
                            Connected to {settings.integrations.slack.workspace}
                          </p>
                        </div>
                      </div>
                      <Button variant="outlined" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton
                          variant="rectangular"
                          width="3rem"
                          height="3rem"
                        />
                        <div>
                          <h4 className="font-medium">Google</h4>
                          <p className="text-muted-foreground text-sm">
                            Not connected
                          </p>
                        </div>
                      </div>
                      <Button>Connect</Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
