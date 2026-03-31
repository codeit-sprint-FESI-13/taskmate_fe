const CrownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_538_16691)">
      <circle
        cx="8"
        cy="8"
        r="8"
        fill="#6C63FF"
      />
      <path
        d="M5 10V7.14286L6.63636 8L8 6L9.36364 8L11 7.14286V10H5Z"
        fill="#F8F7FF"
        stroke="#F8F7FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_538_16691">
        <rect
          width="16"
          height="16"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default CrownIcon;
