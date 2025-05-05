export const ContentType = {
    LINK: 'LINK',
    YOUTUBE: 'YOUTUBE',
    TWEET: 'TWEET',
    DOCUMENT: 'DOCUMENT',
    IMAGE: 'IMAGE',
    OTHER: 'OTHER'
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];
