export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          photo_url: string | null
          university: string | null
          faculty: string | null
          study_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          photo_url?: string | null
          university?: string | null
          faculty?: string | null
          study_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          photo_url?: string | null
          university?: string | null
          faculty?: string | null
          study_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
