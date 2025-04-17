export interface BannerData {
    id: number;
    img1: string;
    img2: string;
    title: string;
    subtitle: string;
    app_store_link: string;
    google_play_link: string;
    login_link: string;
    created_at: string;
    updated_at: string;
}


export interface FeatureData {
    id: number;
    mbl_img1: string;
    mbl_img2: string;
    mbl_img3: string;
    mbl_img4: string;
    title1: string | null;
    all_mbl_img: string;
    title2: string | null;
    created_at: string;
    updated_at: string;
};

export interface MobileMockup {
    id: number;
    back_img: string;
    mbl_img1: string;
    mbl_img2: string;
    title1: string;
    title2: string;
    title3: string;
    color: string;
    created_at: string;
    updated_at: string;
};

export interface HeaderData {
    id: number;
    img: string;
    item_name1: string;
    itemlink1: string;
    item_name2: string;
    itemlink2: string;
    login_link: string;
    app_store_link: string;
    google_play_link: string;
    created_at: string;
    updated_at: string;
}

export interface FooterData {
    id: number;
    color: string;
    logo: string;
    login_link: string;
    app_store_link: string;
    google_play_link: string;
    first_text: string;
    second_text: string;
    third_text: string;
    created_at: string;
    updated_at: string;
};

export interface AchiveData {
    id: number;
    back_img: string;
    mbl_img1: string;
    mbl_img2: string;
    mbl_img3: string;
    title1: string;
    title2: string;
    logo_img: string;
    created_at: string;
    updated_at: string;
};

export interface HomePageData {
    home: BannerData[];
    feature: FeatureData[];
    mobile_mockup: MobileMockup[]; // ✅ updated key here
    footer: FooterData[];
    header: HeaderData[];
    achive: AchiveData[];
  }
