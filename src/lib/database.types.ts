// Tipe TypeScript hasil generate dari database Supabase "siap-pcpm".
// Jangan diedit manual. Generate ulang jika skema berubah.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      flashcard_progres: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          istilah_id: string
          jadwal_ulang: string
          jumlah_review: number
          kotak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          istilah_id: string
          jadwal_ulang?: string
          jumlah_review?: number
          kotak?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          istilah_id?: string
          jadwal_ulang?: string
          jumlah_review?: number
          kotak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jadwal_tugas: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          deskripsi: string
          fase: string
          id: string
          modul: string | null
          selesai: boolean
          selesai_at: string | null
          tanggal: string
          target_menit: number
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          deskripsi: string
          fase: string
          id?: string
          modul?: string | null
          selesai?: boolean
          selesai_at?: string | null
          tanggal: string
          target_menit?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          deskripsi?: string
          fase?: string
          id?: string
          modul?: string | null
          selesai?: boolean
          selesai_at?: string | null
          tanggal?: string
          target_menit?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pengaturan: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          menit_per_hari: number
          preferensi: Json
          tanggal_target: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          menit_per_hari?: number
          preferensi?: Json
          tanggal_target?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          menit_per_hari?: number
          preferensi?: Json
          tanggal_target?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      percobaan: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          durasi_detik: number
          id: string
          jawaban: Json
          jumlah_benar: number
          jumlah_soal: number
          mode: string
          modul: string
          mulai_at: string
          paket: string | null
          per_topik: Json
          skor: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          durasi_detik?: number
          id?: string
          jawaban?: Json
          jumlah_benar?: number
          jumlah_soal?: number
          mode: string
          modul: string
          mulai_at?: string
          paket?: string | null
          per_topik?: Json
          skor?: number | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          durasi_detik?: number
          id?: string
          jawaban?: Json
          jumlah_benar?: number
          jumlah_soal?: number
          mode?: string
          modul?: string
          mulai_at?: string
          paket?: string | null
          per_topik?: Json
          skor?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      psikologi_hasil: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          id: string
          jawaban: Json
          profil: Json
          skor_konsistensi: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          jawaban?: Json
          profil?: Json
          skor_konsistensi?: number | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          jawaban?: Json
          profil?: Json
          skor_konsistensi?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      status_soal: {
        Row: {
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          ditandai: boolean
          jumlah_benar: number
          jumlah_salah: number
          soal_id: string
          terakhir_benar: boolean | null
          terakhir_dikerjakan: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          ditandai?: boolean
          jumlah_benar?: number
          jumlah_salah?: number
          soal_id: string
          terakhir_benar?: boolean | null
          terakhir_dikerjakan?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          ditandai?: boolean
          jumlah_benar?: number
          jumlah_salah?: number
          soal_id?: string
          terakhir_benar?: boolean | null
          terakhir_dikerjakan?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wawancara_jawaban: {
        Row: {
          catatan: string | null
          client_updated_at: string
          created_at: string
          deleted_at: string | null
          jawaban: string
          pertanyaan_id: string
          star: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          catatan?: string | null
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          jawaban?: string
          pertanyaan_id: string
          star?: Json
          updated_at?: string
          user_id?: string
        }
        Update: {
          catatan?: string | null
          client_updated_at?: string
          created_at?: string
          deleted_at?: string | null
          jawaban?: string
          pertanyaan_id?: string
          star?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
