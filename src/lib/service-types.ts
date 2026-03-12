export interface Feature {
  title: string
  header?: string
  description?: string
}

export interface Service {
  id: string
  title: string
  shortTitle: string
  image: string
  subtitle: string
  description: string
  features: Feature[]
  feature1?: string
  cta: string
  label: string
  icon?: string
}
