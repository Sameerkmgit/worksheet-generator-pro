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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          grade: string
          icon: string | null
          id: string
          image_url: string | null
          name: string
          subject: string
          updated_at: string | null
          worksheet_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          grade: string
          icon?: string | null
          id: string
          image_url?: string | null
          name: string
          subject: string
          updated_at?: string | null
          worksheet_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          grade?: string
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subject?: string
          updated_at?: string | null
          worksheet_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      worksheet_categories: {
        Row: {
          created_at: string
          description: string | null
          grade: string
          id: string
          image_url: string | null
          sort_order: number
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          grade: string
          id?: string
          image_url?: string | null
          sort_order?: number
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          grade?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      worksheet_image_overrides: {
        Row: {
          created_at: string | null
          image_url: string
          updated_at: string | null
          worksheet_id: string
        }
        Insert: {
          created_at?: string | null
          image_url: string
          updated_at?: string | null
          worksheet_id: string
        }
        Update: {
          created_at?: string | null
          image_url?: string
          updated_at?: string | null
          worksheet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worksheet_image_overrides_worksheet_id_fkey"
            columns: ["worksheet_id"]
            isOneToOne: true
            referencedRelation: "v_pack_items_dynamic"
            referencedColumns: ["worksheet_id"]
          },
          {
            foreignKeyName: "worksheet_image_overrides_worksheet_id_fkey"
            columns: ["worksheet_id"]
            isOneToOne: true
            referencedRelation: "worksheets"
            referencedColumns: ["id"]
          },
        ]
      }
      worksheet_packs: {
        Row: {
          created_at: string
          description: string | null
          grade: number
          id: string
          is_published: boolean
          rule_n: number
          rule_type: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          grade: number
          id?: string
          is_published?: boolean
          rule_n?: number
          rule_type?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          grade?: number
          id?: string
          is_published?: boolean
          rule_n?: number
          rule_type?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      worksheet_subcategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          image_url: string | null
          is_archived: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_archived?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_archived?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "worksheet_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "worksheet_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      worksheets: {
        Row: {
          category_id: string | null
          content: string | null
          created_at: string | null
          description: string | null
          faq: Json | null
          grade: string
          heading: string | null
          id: string
          image_url: string | null
          intro: string | null
          is_archived: boolean | null
          pdf_url: string
          questions: Json | null
          seo: Json | null
          skills: string[] | null
          subcategory_id: string | null
          subject: string
          title: string
          updated_at: string | null
          usage: string | null
        }
        Insert: {
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          faq?: Json | null
          grade: string
          heading?: string | null
          id: string
          image_url?: string | null
          intro?: string | null
          is_archived?: boolean | null
          pdf_url: string
          questions?: Json | null
          seo?: Json | null
          skills?: string[] | null
          subcategory_id?: string | null
          subject: string
          title: string
          updated_at?: string | null
          usage?: string | null
        }
        Update: {
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          faq?: Json | null
          grade?: string
          heading?: string | null
          id?: string
          image_url?: string | null
          intro?: string | null
          is_archived?: boolean | null
          pdf_url?: string
          questions?: Json | null
          seo?: Json | null
          skills?: string[] | null
          subcategory_id?: string | null
          subject?: string
          title?: string
          updated_at?: string | null
          usage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worksheets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "worksheet_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worksheets_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "worksheet_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_pack_card_dynamic: {
        Row: {
          description: string | null
          grade: number | null
          pack_id: string | null
          slug: string | null
          title: string | null
          worksheet_count: number | null
          worksheet_titles: Json | null
        }
        Relationships: []
      }
      v_pack_items_dynamic: {
        Row: {
          display_order: number | null
          grade: number | null
          pack_id: string | null
          title: string | null
          worksheet_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      grant_admin_role: { Args: { user_email: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
