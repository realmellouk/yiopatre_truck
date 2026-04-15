// ========== INTERNATIONALIZATION (i18n) ==========
const i18nTranslations = {
    en: {
        // Header / Nav
        nav_home: "Home",
        nav_products: "Products",
        nav_categories: "Categories",
        nav_cart: "Cart",
        nav_orders: "My Orders",
        nav_support: "Support",
        nav_admin: "Admin",
        search_placeholder: "Search parts, brands, or reference...",
        btn_login: "Login",
        btn_signup: "Sign Up",
        user_profile: "My Profile",
        user_orders: "My Orders",
        user_settings: "Settings",
        user_logout: "Logout",
        cart_label: "Cart",

        // Auth page
        auth_welcome: "Welcome to Yiopatre Truck",
        auth_subtitle: "Sign in to your account or create a new one",
        auth_tab_login: "Login",
        auth_tab_signup: "Sign Up",
        label_email: "Email Address",
        label_password: "Password",
        label_remember: "Remember me",
        btn_login_submit: "Login",
        forgot_password: "Forgot your password?",
        label_first_name: "First Name",
        label_last_name: "Last Name",
        label_phone: "Phone Number",
        label_confirm_password: "Confirm Password",
        label_terms: "I agree to the",
        label_terms_link: "Terms & Conditions",
        btn_create_account: "Create Account",

        // Profile page
        btn_edit_profile: "Edit Profile",
        profile_personal_info: "Personal Information",
        label_full_name: "Full Name",
        label_member_since: "Member Since",
        edit_personal_info: "Edit Personal Information",
        btn_save_changes: "Save Changes",
        btn_cancel: "Cancel",
        profile_addresses: "Shipping Addresses",
        btn_add_address: "Add New Address",
        profile_security: "Account Security",
        label_password_display: "Password",
        btn_change_password: "Change Password",
        label_2fa: "Two-Factor Authentication",
        label_2fa_status: "Disabled",
        btn_enable_2fa: "Enable 2FA",

        // Home page
        hero_title: "Professional Truck Parts Marketplace",
        hero_subtitle: "Source genuine parts for heavy-duty vehicles with guaranteed quality, fast shipping, and 24/7 expert support.",
        btn_shop_now: "Shop Now",
        btn_browse_categories: "Browse Categories",
        featured_title: "Featured Products",
        btn_view_all: "View All Products",

        // Categories page
        categories_title: "Product Categories",
        products_suffix: "products",

        // Products page
        all_products_title: "All Products",
        filter_category: "Category",
        filter_all_categories: "All Categories",
        filter_sort: "Sort By",
        sort_featured: "Featured",
        sort_price_low: "Price: Low to High",
        sort_price_high: "Price: High to Low",
        sort_name: "Name A-Z",
        sort_newest: "Newest",
        filter_price_range: "Price Range",
        filter_min: "Min",
        filter_max: "Max",
        filter_stock: "Stock Status",
        filter_all_products: "All Products",
        filter_in_stock: "In Stock Only",
        btn_reset: "Reset",
        no_products_found: "No products found",
        no_products_hint: "Try adjusting your filters or search terms",
        badge_featured: "Featured",
        stock_in: "In Stock",
        stock_low: "Low Stock",
        stock_out: "Out of Stock",
        btn_add_to_cart: "Add",
        label_ref: "Ref",

        // Product detail modal
        label_reference: "Reference:",
        label_brand: "Brand:",
        label_category: "Category:",
        label_warranty: "Warranty:",
        warranty_months: "months",
        label_description: "Description",
        btn_add_cart_detail: "Add to Cart",
        btn_close: "Close",

        // Cart page
        cart_title: "Your Shopping Cart",
        cart_empty_title: "Your cart is empty",
        cart_empty_subtitle: "Add some products to get started",
        btn_browse_products: "Browse Products",
        label_each: "each",
        label_subtotal: "Subtotal:",
        label_tax: "Tax (8%):",
        label_total: "Total:",
        btn_checkout: "Proceed to Checkout",
        btn_continue_shopping: "Continue Shopping",

        // Checkout page
        checkout_title: "Checkout",
        shipping_info: "Shipping Information",
        label_address: "Address",
        placeholder_address: "Street Address",
        label_city: "City",
        label_state: "State",
        label_select_city: "Select city",
        label_zip: "ZIP Code",
        delivery_options: "Delivery Options",
        delivery_standard: "Standard Delivery",
        delivery_standard_detail: "5-7 business days · Free",
        delivery_express: "Express Delivery",
        delivery_express_detail: "2-3 business days · $25.00",
        payment_method: "Payment Method",
        payment_card: "Credit/Debit Card",
        payment_card_detail: "Pay securely with your card",
        payment_paypal: "PayPal",
        payment_paypal_detail: "Fast and secure payment",
        payment_cash: "Cash on Delivery",
        payment_cash_detail: "Pay when you receive the order",
        label_card_number: "Card Number",
        label_expiry: "Expiry Date",
        label_cvv: "CVV",
        label_card_name: "Name on Card",
        order_summary: "Order Summary",
        btn_complete_order: "Complete Order",
        payment_secure: "Your payment is secure and encrypted",

        // Order confirmation
        order_confirmed: "Order Confirmed!",
        order_confirmed_msg: "Thank you for your purchase. Your order has been received and is being processed.",
        order_email_msg: "You will receive an email confirmation shortly with tracking information.",
        btn_back_home: "Back to Home",
        btn_view_orders: "View Orders",

        // My Orders page
        orders_title: "My Orders",
        th_order_id: "Order ID",
        th_date: "Date",
        th_items: "Items",
        th_total: "Total",
        th_status: "Status",
        th_actions: "Actions",
        no_orders: "No orders yet",
        btn_start_shopping: "Start Shopping",

        // Support page
        support_title: "Customer Support",
        contact_us: "Contact Us",
        label_name: "Name",
        label_order_ref: "Order Reference (Optional)",
        label_subject: "Subject",
        select_subject: "Select a subject",
        subject_order: "Order Issue",
        subject_product: "Product Question",
        subject_shipping: "Shipping & Delivery",
        subject_return: "Returns & Refunds",
        subject_other: "Other",
        label_message: "Message",
        placeholder_message: "How can we help you?",
        btn_send_message: "Send Message",
        faq_title: "FAQ",
        contact_info_title: "Contact Information",
        label_phone_info: "Phone:",
        label_email_info: "Email:",
        label_hours_info: "Hours:",
        label_hours_value: "Mon-Fri 8AM-8PM EST",
        label_address_info: "Address:",
        label_address_value: "123 Truck Lane, Industrial Park, TX 75001",

        // Admin page
        admin_title: "Admin Dashboard",
        admin_tab_products: "Products",
        admin_tab_add: "Add Product",
        admin_product_list: "Product List",
        admin_add_product: "Add New Product",
        label_product_name: "Product Name *",
        placeholder_product_name: "Heavy Duty Air Filter",
        label_ref_code: "Reference Code *",
        placeholder_ref_code: "AF-2024-HD",
        label_category_admin: "Category *",
        select_category: "-- Select Category --",
        label_price: "Price ($) *",
        label_stock_status: "Stock Status *",
        select_stock: "-- Select Status --",
        stock_in_stock: "In Stock",
        stock_out_of_stock: "Out of Stock",
        label_quantity: "Quantity *",
        label_image_url: "Image URL *",
        label_desc: "Description *",
        placeholder_desc: "Product description...",
        btn_add: "Add",
        btn_clear: "Clear",
        btn_edit: "Edit",
        btn_delete: "Delete",

        // Footer
        footer_brand_desc: "Your trusted source for genuine truck parts. We provide reliable parts for heavy-duty vehicles with fast delivery and expert support.",
        footer_quick_links: "Quick Links",
        footer_contact_info: "Contact Info",
        footer_address: "123 Truck Lane, Industrial Park, TX 75001",
        footer_phone: "+1 (555) 123-4567",
        footer_email: "support@yiopatretruck.com",
        footer_hours: "Mon-Fri: 8AM-8PM EST",
        footer_newsletter: "Newsletter",
        footer_newsletter_desc: "Subscribe to get updates on new products and special offers.",
        footer_email_placeholder: "Your email address",
        footer_copyright: "© 2026 Yiopatre Truck. All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_admin_panel: "Admin Panel",

        // Notifications / dynamic messages
        no_products_available: "No products available. Please check data loading.",
        no_featured_products: "No featured products available.",
        no_addresses: "No addresses saved yet",
    },

    fr: {
        nav_home: "Accueil",
        nav_products: "Produits",
        nav_categories: "Catégories",
        nav_cart: "Panier",
        nav_orders: "Mes Commandes",
        nav_support: "Support",
        nav_admin: "Admin",
        search_placeholder: "Rechercher pièces, marques ou référence...",
        btn_login: "Connexion",
        btn_signup: "S'inscrire",
        user_profile: "Mon Profil",
        user_orders: "Mes Commandes",
        user_settings: "Paramètres",
        user_logout: "Déconnexion",
        cart_label: "Panier",

        auth_welcome: "Bienvenue chez Yiopatre Truck",
        auth_subtitle: "Connectez-vous à votre compte ou créez-en un nouveau",
        auth_tab_login: "Connexion",
        auth_tab_signup: "S'inscrire",
        label_email: "Adresse e-mail",
        label_password: "Mot de passe",
        label_remember: "Se souvenir de moi",
        btn_login_submit: "Connexion",
        forgot_password: "Mot de passe oublié ?",
        label_first_name: "Prénom",
        label_last_name: "Nom",
        label_phone: "Numéro de téléphone",
        label_confirm_password: "Confirmer le mot de passe",
        label_terms: "J'accepte les",
        label_terms_link: "Conditions Générales",
        btn_create_account: "Créer un compte",

        btn_edit_profile: "Modifier le profil",
        profile_personal_info: "Informations personnelles",
        label_full_name: "Nom complet",
        label_member_since: "Membre depuis",
        edit_personal_info: "Modifier les informations personnelles",
        btn_save_changes: "Enregistrer",
        btn_cancel: "Annuler",
        profile_addresses: "Adresses de livraison",
        btn_add_address: "Ajouter une adresse",
        profile_security: "Sécurité du compte",
        label_password_display: "Mot de passe",
        btn_change_password: "Changer le mot de passe",
        label_2fa: "Authentification à deux facteurs",
        label_2fa_status: "Désactivée",
        btn_enable_2fa: "Activer 2FA",

        hero_title: "Marché Professionnel de Pièces de Camion",
        hero_subtitle: "Trouvez des pièces authentiques pour véhicules lourds avec qualité garantie, livraison rapide et support expert 24/7.",
        btn_shop_now: "Acheter Maintenant",
        btn_browse_categories: "Parcourir les Catégories",
        featured_title: "Produits en Vedette",
        btn_view_all: "Voir Tous les Produits",

        categories_title: "Catégories de Produits",
        products_suffix: "produits",

        all_products_title: "Tous les Produits",
        filter_category: "Catégorie",
        filter_all_categories: "Toutes les Catégories",
        filter_sort: "Trier par",
        sort_featured: "En vedette",
        sort_price_low: "Prix : Croissant",
        sort_price_high: "Prix : Décroissant",
        sort_name: "Nom A-Z",
        sort_newest: "Plus récent",
        filter_price_range: "Fourchette de prix",
        filter_min: "Min",
        filter_max: "Max",
        filter_stock: "Disponibilité",
        filter_all_products: "Tous les Produits",
        filter_in_stock: "En Stock Seulement",
        btn_reset: "Réinitialiser",
        no_products_found: "Aucun produit trouvé",
        no_products_hint: "Essayez d'ajuster vos filtres ou termes de recherche",
        badge_featured: "En vedette",
        stock_in: "En Stock",
        stock_low: "Stock Faible",
        stock_out: "Rupture de Stock",
        btn_add_to_cart: "Ajouter",
        label_ref: "Réf",

        label_reference: "Référence :",
        label_brand: "Marque :",
        label_category: "Catégorie :",
        label_warranty: "Garantie :",
        warranty_months: "mois",
        label_description: "Description",
        btn_add_cart_detail: "Ajouter au Panier",
        btn_close: "Fermer",

        cart_title: "Votre Panier",
        cart_empty_title: "Votre panier est vide",
        cart_empty_subtitle: "Ajoutez des produits pour commencer",
        btn_browse_products: "Parcourir les Produits",
        label_each: "l'unité",
        label_subtotal: "Sous-total :",
        label_tax: "Taxe (8%) :",
        label_total: "Total :",
        btn_checkout: "Passer à la Caisse",
        btn_continue_shopping: "Continuer les Achats",

        checkout_title: "Paiement",
        shipping_info: "Informations de Livraison",
        label_address: "Adresse",
        placeholder_address: "Adresse postale",
        label_city: "Ville",
        label_state: "Région",
        label_select_city: "Sélectionner une ville",
        label_zip: "Code Postal",
        delivery_options: "Options de Livraison",
        delivery_standard: "Livraison Standard",
        delivery_standard_detail: "5-7 jours ouvrables · Gratuit",
        delivery_express: "Livraison Express",
        delivery_express_detail: "2-3 jours ouvrables · 25,00 $",
        payment_method: "Mode de Paiement",
        payment_card: "Carte de Crédit/Débit",
        payment_card_detail: "Payez en toute sécurité avec votre carte",
        payment_paypal: "PayPal",
        payment_paypal_detail: "Paiement rapide et sécurisé",
        payment_cash: "Paiement à la Livraison",
        payment_cash_detail: "Payez à la réception de la commande",
        label_card_number: "Numéro de Carte",
        label_expiry: "Date d'Expiration",
        label_cvv: "CVV",
        label_card_name: "Nom sur la Carte",
        order_summary: "Résumé de la Commande",
        btn_complete_order: "Finaliser la Commande",
        payment_secure: "Votre paiement est sécurisé et chiffré",

        order_confirmed: "Commande Confirmée !",
        order_confirmed_msg: "Merci pour votre achat. Votre commande a été reçue et est en cours de traitement.",
        order_email_msg: "Vous recevrez un e-mail de confirmation avec les informations de suivi.",
        btn_back_home: "Retour à l'Accueil",
        btn_view_orders: "Voir les Commandes",

        orders_title: "Mes Commandes",
        th_order_id: "N° de Commande",
        th_date: "Date",
        th_items: "Articles",
        th_total: "Total",
        th_status: "Statut",
        th_actions: "Actions",
        no_orders: "Aucune commande",
        btn_start_shopping: "Commencer vos Achats",

        support_title: "Service Client",
        contact_us: "Contactez-nous",
        label_name: "Nom",
        label_order_ref: "Référence de commande (Optionnel)",
        label_subject: "Sujet",
        select_subject: "Sélectionner un sujet",
        subject_order: "Problème de commande",
        subject_product: "Question sur un produit",
        subject_shipping: "Livraison & Expédition",
        subject_return: "Retours & Remboursements",
        subject_other: "Autre",
        label_message: "Message",
        placeholder_message: "Comment pouvons-nous vous aider ?",
        btn_send_message: "Envoyer le Message",
        faq_title: "FAQ",
        contact_info_title: "Coordonnées",
        label_phone_info: "Téléphone :",
        label_email_info: "E-mail :",
        label_hours_info: "Horaires :",
        label_hours_value: "Lun-Ven 8h-20h EST",
        label_address_info: "Adresse :",
        label_address_value: "123 Truck Lane, Industrial Park, TX 75001",

        admin_title: "Tableau de Bord Admin",
        admin_tab_products: "Produits",
        admin_tab_add: "Ajouter un Produit",
        admin_product_list: "Liste des Produits",
        admin_add_product: "Ajouter un Nouveau Produit",
        label_product_name: "Nom du Produit *",
        placeholder_product_name: "Filtre à Air Haute Performance",
        label_ref_code: "Code de Référence *",
        placeholder_ref_code: "AF-2024-HD",
        label_category_admin: "Catégorie *",
        select_category: "-- Sélectionner une Catégorie --",
        label_price: "Prix ($) *",
        label_stock_status: "Statut du Stock *",
        select_stock: "-- Sélectionner le Statut --",
        stock_in_stock: "En Stock",
        stock_out_of_stock: "Rupture de Stock",
        label_quantity: "Quantité *",
        label_image_url: "URL de l'Image *",
        label_desc: "Description *",
        placeholder_desc: "Description du produit...",
        btn_add: "Ajouter",
        btn_clear: "Effacer",
        btn_edit: "Modifier",
        btn_delete: "Supprimer",

        footer_brand_desc: "Votre source de confiance pour des pièces de camion authentiques. Nous fournissons des pièces fiables pour véhicules lourds avec livraison rapide et support expert.",
        footer_quick_links: "Liens Rapides",
        footer_contact_info: "Coordonnées",
        footer_address: "123 Truck Lane, Industrial Park, TX 75001",
        footer_phone: "+1 (555) 123-4567",
        footer_email: "support@yiopatretruck.com",
        footer_hours: "Lun-Ven : 8h-20h EST",
        footer_newsletter: "Newsletter",
        footer_newsletter_desc: "Abonnez-vous pour recevoir les mises à jour sur les nouveaux produits et offres spéciales.",
        footer_email_placeholder: "Votre adresse e-mail",
        footer_copyright: "© 2026 Yiopatre Truck. Tous droits réservés.",
        footer_privacy: "Politique de Confidentialité",
        footer_terms: "Conditions d'Utilisation",
        footer_admin_panel: "Panneau Admin",

        no_products_available: "Aucun produit disponible. Veuillez vérifier le chargement des données.",
        no_featured_products: "Aucun produit en vedette disponible.",
        no_addresses: "Aucune adresse enregistrée",
    },

    ar: {
        nav_home: "الرئيسية",
        nav_products: "المنتجات",
        nav_categories: "الفئات",
        nav_cart: "السلة",
        nav_orders: "طلباتي",
        nav_support: "الدعم",
        nav_admin: "الإدارة",
        search_placeholder: "البحث عن قطع، علامات تجارية أو مرجع...",
        btn_login: "تسجيل الدخول",
        btn_signup: "إنشاء حساب",
        user_profile: "ملفي الشخصي",
        user_orders: "طلباتي",
        user_settings: "الإعدادات",
        user_logout: "تسجيل الخروج",
        cart_label: "السلة",

        auth_welcome: "مرحباً بكم في Yiopatre Truck",
        auth_subtitle: "سجّل الدخول إلى حسابك أو أنشئ حساباً جديداً",
        auth_tab_login: "تسجيل الدخول",
        auth_tab_signup: "إنشاء حساب",
        label_email: "البريد الإلكتروني",
        label_password: "كلمة المرور",
        label_remember: "تذكرني",
        btn_login_submit: "تسجيل الدخول",
        forgot_password: "هل نسيت كلمة المرور؟",
        label_first_name: "الاسم الأول",
        label_last_name: "اسم العائلة",
        label_phone: "رقم الهاتف",
        label_confirm_password: "تأكيد كلمة المرور",
        label_terms: "أوافق على",
        label_terms_link: "الشروط والأحكام",
        btn_create_account: "إنشاء حساب",

        btn_edit_profile: "تعديل الملف الشخصي",
        profile_personal_info: "المعلومات الشخصية",
        label_full_name: "الاسم الكامل",
        label_member_since: "عضو منذ",
        edit_personal_info: "تعديل المعلومات الشخصية",
        btn_save_changes: "حفظ التغييرات",
        btn_cancel: "إلغاء",
        profile_addresses: "عناوين الشحن",
        btn_add_address: "إضافة عنوان جديد",
        profile_security: "أمان الحساب",
        label_password_display: "كلمة المرور",
        btn_change_password: "تغيير كلمة المرور",
        label_2fa: "المصادقة الثنائية",
        label_2fa_status: "معطّلة",
        btn_enable_2fa: "تفعيل المصادقة الثنائية",

        hero_title: "سوق قطع الشاحنات الاحترافي",
        hero_subtitle: "احصل على قطع أصلية للمركبات الثقيلة بجودة مضمونة وشحن سريع ودعم فني على مدار الساعة.",
        btn_shop_now: "تسوّق الآن",
        btn_browse_categories: "تصفّح الفئات",
        featured_title: "المنتجات المميزة",
        btn_view_all: "عرض جميع المنتجات",

        categories_title: "فئات المنتجات",
        products_suffix: "منتجات",

        all_products_title: "جميع المنتجات",
        filter_category: "الفئة",
        filter_all_categories: "جميع الفئات",
        filter_sort: "ترتيب حسب",
        sort_featured: "المميزة",
        sort_price_low: "السعر: من الأقل",
        sort_price_high: "السعر: من الأعلى",
        sort_name: "الاسم أ-ي",
        sort_newest: "الأحدث",
        filter_price_range: "نطاق السعر",
        filter_min: "الحد الأدنى",
        filter_max: "الحد الأقصى",
        filter_stock: "حالة المخزون",
        filter_all_products: "جميع المنتجات",
        filter_in_stock: "المتوفرة فقط",
        btn_reset: "إعادة تعيين",
        no_products_found: "لم يتم العثور على منتجات",
        no_products_hint: "حاول تعديل الفلاتر أو مصطلحات البحث",
        badge_featured: "مميز",
        stock_in: "متوفر",
        stock_low: "مخزون منخفض",
        stock_out: "غير متوفر",
        btn_add_to_cart: "أضف",
        label_ref: "المرجع",

        label_reference: "المرجع:",
        label_brand: "العلامة التجارية:",
        label_category: "الفئة:",
        label_warranty: "الضمان:",
        warranty_months: "أشهر",
        label_description: "الوصف",
        btn_add_cart_detail: "أضف إلى السلة",
        btn_close: "إغلاق",

        cart_title: "سلة التسوق",
        cart_empty_title: "سلتك فارغة",
        cart_empty_subtitle: "أضف بعض المنتجات للبدء",
        btn_browse_products: "تصفّح المنتجات",
        label_each: "للوحدة",
        label_subtotal: "المجموع الفرعي:",
        label_tax: "الضريبة (8%):",
        label_total: "الإجمالي:",
        btn_checkout: "المتابعة للدفع",
        btn_continue_shopping: "متابعة التسوق",

        checkout_title: "الدفع",
        shipping_info: "معلومات الشحن",
        label_address: "العنوان",
        placeholder_address: "عنوان الشارع",
        label_city: "المدينة",
        label_state: "المنطقة",
        label_select_city: "اختر مدينة",
        label_zip: "الرمز البريدي",
        delivery_options: "خيارات التوصيل",
        delivery_standard: "توصيل عادي",
        delivery_standard_detail: "5-7 أيام عمل · مجاني",
        delivery_express: "توصيل سريع",
        delivery_express_detail: "2-3 أيام عمل · 25.00$",
        payment_method: "طريقة الدفع",
        payment_card: "بطاقة ائتمان/خصم",
        payment_card_detail: "ادفع بأمان ببطاقتك",
        payment_paypal: "باي بال",
        payment_paypal_detail: "دفع سريع وآمن",
        payment_cash: "الدفع عند الاستلام",
        payment_cash_detail: "ادفع عند استلام الطلب",
        label_card_number: "رقم البطاقة",
        label_expiry: "تاريخ الانتهاء",
        label_cvv: "CVV",
        label_card_name: "الاسم على البطاقة",
        order_summary: "ملخص الطلب",
        btn_complete_order: "إتمام الطلب",
        payment_secure: "دفعتك آمنة ومشفّرة",

        order_confirmed: "تم تأكيد الطلب!",
        order_confirmed_msg: "شكراً لشرائك. تم استلام طلبك وجاري معالجته.",
        order_email_msg: "ستتلقى بريداً إلكترونياً للتأكيد مع معلومات التتبع قريباً.",
        btn_back_home: "العودة للرئيسية",
        btn_view_orders: "عرض الطلبات",

        orders_title: "طلباتي",
        th_order_id: "رقم الطلب",
        th_date: "التاريخ",
        th_items: "المنتجات",
        th_total: "الإجمالي",
        th_status: "الحالة",
        th_actions: "الإجراءات",
        no_orders: "لا توجد طلبات بعد",
        btn_start_shopping: "ابدأ التسوق",

        support_title: "خدمة العملاء",
        contact_us: "اتصل بنا",
        label_name: "الاسم",
        label_order_ref: "مرجع الطلب (اختياري)",
        label_subject: "الموضوع",
        select_subject: "اختر موضوعاً",
        subject_order: "مشكلة في الطلب",
        subject_product: "سؤال عن منتج",
        subject_shipping: "الشحن والتوصيل",
        subject_return: "الإرجاع والاسترداد",
        subject_other: "أخرى",
        label_message: "الرسالة",
        placeholder_message: "كيف يمكننا مساعدتك؟",
        btn_send_message: "إرسال الرسالة",
        faq_title: "الأسئلة الشائعة",
        contact_info_title: "معلومات الاتصال",
        label_phone_info: "الهاتف:",
        label_email_info: "البريد الإلكتروني:",
        label_hours_info: "ساعات العمل:",
        label_hours_value: "الإثنين-الجمعة 8ص-8م بتوقيت شرق أمريكا",
        label_address_info: "العنوان:",
        label_address_value: "123 Truck Lane, Industrial Park, TX 75001",

        admin_title: "لوحة تحكم المدير",
        admin_tab_products: "المنتجات",
        admin_tab_add: "إضافة منتج",
        admin_product_list: "قائمة المنتجات",
        admin_add_product: "إضافة منتج جديد",
        label_product_name: "اسم المنتج *",
        placeholder_product_name: "فلتر هواء عالي الأداء",
        label_ref_code: "رمز المرجع *",
        placeholder_ref_code: "AF-2024-HD",
        label_category_admin: "الفئة *",
        select_category: "-- اختر فئة --",
        label_price: "السعر ($) *",
        label_stock_status: "حالة المخزون *",
        select_stock: "-- اختر الحالة --",
        stock_in_stock: "متوفر",
        stock_out_of_stock: "غير متوفر",
        label_quantity: "الكمية *",
        label_image_url: "رابط الصورة *",
        label_desc: "الوصف *",
        placeholder_desc: "وصف المنتج...",
        btn_add: "إضافة",
        btn_clear: "مسح",
        btn_edit: "تعديل",
        btn_delete: "حذف",

        footer_brand_desc: "مصدرك الموثوق لقطع الشاحنات الأصلية. نوفر قطعاً موثوقة للمركبات الثقيلة مع توصيل سريع ودعم متخصص.",
        footer_quick_links: "روابط سريعة",
        footer_contact_info: "معلومات الاتصال",
        footer_address: "123 Truck Lane, Industrial Park, TX 75001",
        footer_phone: "+1 (555) 123-4567",
        footer_email: "support@yiopatretruck.com",
        footer_hours: "الإثنين-الجمعة: 8ص-8م بتوقيت شرق أمريكا",
        footer_newsletter: "النشرة الإخبارية",
        footer_newsletter_desc: "اشترك للحصول على تحديثات حول المنتجات الجديدة والعروض الخاصة.",
        footer_email_placeholder: "بريدك الإلكتروني",
        footer_copyright: "© 2026 Yiopatre Truck. جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        footer_terms: "شروط الخدمة",
        footer_admin_panel: "لوحة الإدارة",

        no_products_available: "لا توجد منتجات متاحة. يرجى التحقق من تحميل البيانات.",
        no_featured_products: "لا توجد منتجات مميزة متاحة.",
        no_addresses: "لا توجد عناوين محفوظة بعد",
    }
};

// ========== i18n ENGINE ==========
let currentLang = localStorage.getItem('yiopatre-lang') || 'en';

function t(key) {
    const lang = i18nTranslations[currentLang] || i18nTranslations.en;
    return lang[key] || i18nTranslations.en[key] || key;
}

function setLanguage(lang) {
    if (!i18nTranslations[lang]) return;
    currentLang = lang;
    localStorage.setItem('yiopatre-lang', lang);
    applyTranslations();
    applyDirection();
    // Update the dropdown display
    const sel = document.getElementById('lang-selector');
    if (sel) sel.value = lang;
}

function applyDirection() {
    const html = document.documentElement;
    if (currentLang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', currentLang);
    }
}

function applyTranslations() {
    // Apply all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    // Apply all data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });
    // Apply all data-i18n-html elements (for innerHTML with icons)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const iconEl = el.querySelector('i');
        const iconHTML = iconEl ? iconEl.outerHTML + ' ' : '';
        el.innerHTML = iconHTML + t(key);
    });

    // Re-render dynamic content that's currently visible
    refreshDynamicContent();
}

function refreshDynamicContent() {
    // Re-render pages that generate content via JS
    const visiblePage = document.querySelector('.page:not(.hidden)');
    if (!visiblePage) return;
    const pageId = visiblePage.id.replace('page-', '');

    switch (pageId) {
        case 'home':
            if (typeof loadFeaturedProducts === 'function') loadFeaturedProducts();
            if (typeof loadCategories === 'function') loadCategories();
            break;
        case 'products':
            if (typeof loadAllProducts === 'function') loadAllProducts();
            if (typeof populateCategoryFilter === 'function') populateCategoryFilter();
            break;
        case 'categories':
            if (typeof loadAllCategories === 'function') loadAllCategories();
            break;
        case 'cart':
            if (typeof displayCartItems === 'function') displayCartItems();
            break;
        case 'admin':
            if (typeof loadAdminProductList === 'function') loadAdminProductList();
            break;
    }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function () {
    applyDirection();
    applyTranslations();
});

// ========== GLOBAL EXPORTS ==========
window.t = t;
window.setLanguage = setLanguage;
window.currentLang = currentLang;
// Make currentLang accessible as a getter
Object.defineProperty(window, 'currentLang', {
    get: function () { return currentLang; },
    set: function (v) { currentLang = v; }
});

console.log('=== I18N.JS READY ===');
