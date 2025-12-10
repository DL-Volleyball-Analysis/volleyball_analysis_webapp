import React from 'react';

interface IconProps {
    className?: string;
    size?: number;
}

// Spike - 球員跳起扣球的實心剪影
export const SpikeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* 運動員跳躍扣球剪影 - 實心版 */}
        <ellipse cx="14" cy="3.5" rx="2" ry="2.2" />
        <path d="M14 6 C13 6.5 12.5 8 12 10 L10 14 L8 18 L6 22 L8 22 L10 18 L11 16 L13 18 L14 22 L16 22 L15 16 L14 12 L16 10 L18 8 L20 4 L18 5 L16 7 L14.5 6.5 L14 6 Z" />
        <path d="M12 8 L9 6 L8 7" />
        <circle cx="21" cy="2.5" r="2" />
    </svg>
);

// Set - 球員舉手托球的實心剪影  
export const SetIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* 運動員托球剪影 - 雙手高舉 */}
        <ellipse cx="12" cy="7" rx="2" ry="2.2" />
        <path d="M12 9.5 L11 12 L10 15 L9 18 L8 22 L10 22 L11 18 L12 16 L13 18 L14 22 L16 22 L15 18 L14 15 L13 12 L12 9.5 Z" />
        <path d="M11 10 L9 6 L8 3 L9 2 L10 4 L11 7" />
        <path d="M13 10 L15 6 L16 3 L15 2 L14 4 L13 7" />
        <circle cx="12" cy="1" r="1.8" />
    </svg>
);

// Receive - 球員低姿接球的實心剪影
export const ReceiveIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* 低姿接球 - 手臂前伸、膝蓋彎曲 */}
        <ellipse cx="14" cy="6" rx="2" ry="2.2" />
        <path d="M14 8.5 L13 11 L12 14 C11.5 14.5 10 15 9 16 L7 18 L6 22 L8 22 L10 19 L12 16 L14 18 L16 20 L18 22 L20 22 L17 18 L15 14 L14.5 11 L14 8.5 Z" />
        <path d="M13 10 L10 12 L6 13 L4 14" />
        <circle cx="3" cy="12" r="2" />
    </svg>
);

// Serve - 球員發球的實心剪影
export const ServeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* 發球姿勢 - 拋球+準備擊球 */}
        <ellipse cx="12" cy="6" rx="2" ry="2.2" />
        <path d="M12 8.5 L11.5 11 L11 14 L10 17 L9 22 L11 22 L12 18 L13 22 L15 22 L14 17 L13 14 L12.5 11 L12 8.5 Z" />
        <path d="M11 10 L8 7 L6 4 L7 3 L8 5 L10 8" />
        <path d="M13 10 L16 8 L19 9 L18 10 L15 9.5" />
        <circle cx="5" cy="2" r="2" />
    </svg>
);

// Block - 球員雙手攔網的實心剪影
export const BlockIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* 攔網 - 雙手高舉、身體挺直 */}
        <ellipse cx="12" cy="6" rx="2" ry="2.2" />
        <path d="M12 8.5 L11.5 12 L11 15 L10 18 L9 22 L11 22 L12 18.5 L13 22 L15 22 L14 18 L13 15 L12.5 12 L12 8.5 Z" />
        <path d="M11 9.5 L9 6 L7 2 L8 1.5 L9.5 4 L11 8" />
        <path d="M13 9.5 L15 6 L17 2 L16 1.5 L14.5 4 L13 8" />
        <rect x="6" y="0.5" width="3" height="2.5" rx="1" />
        <rect x="15" y="0.5" width="3" height="2.5" rx="1" />
    </svg>
);

// Score/Star icon  
export const ScoreIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
);
