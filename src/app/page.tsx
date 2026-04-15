import Image from "next/image";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import { Spacing } from "@/components/common/Spacing";

export default function Home() {
  return (
    <>
      <section className="relative flex h-[368px] w-screen flex-col items-center justify-start gap-3 bg-blue-800 bg-[linear-gradient(180deg,rgba(108,99,255,0.64)_31.41%,rgba(167,162,255,0.48)_126.5%)] pt-[68px]">
        <h3 className="tracker-[-0.14px] text-[14px] font-semibold text-blue-50">
          목표부터 할일까지 함께 관리하는 플랫폼
        </h3>
        <Icon
          name="LogoWhiteText"
          size={209}
          className="h-[42px]"
        />
        <button
          type="button"
          className="mt-1 flex h-8 w-[101px] items-center justify-center gap-1 rounded-full bg-gray-800 px-[14px] py-[7px] text-[13px] leading-[18px] font-semibold tracking-[-0.13px] text-white shadow-[0_0_8px_0_rgba(43,43,43,0.08)]"
        >
          시작하기
        </button>

        <Image
          src="/images/IPadMockup.png"
          alt="iPad 앱 화면 목업"
          width={750}
          height={346}
          className="absolute bottom-0 z-10"
        />
        <Image
          src="/images/GreenCharacter.png"
          alt="Green Character"
          width={1536}
          height={1024}
          className="absolute right-1 bottom-18 h-auto w-[80px]"
        />
        <Image
          src="/images/PurpleCharacter.png"
          alt="Green Character"
          width={1536}
          height={1024}
          className="absolute bottom-4 left-[-14] h-auto w-[100px]"
        />
      </section>

      <section className="relative flex w-screen flex-col items-center justify-start bg-blue-800 px-10 pt-10 pb-[30px]">
        <span className="self-start text-[16px] font-semibold text-blue-300">
          더 똑똑한 할 일 관리
        </span>

        <Spacing size={16} />

        <div className="flex w-full flex-col items-start gap-1">
          <h1 className="text-inverse-normal text-xl font-bold tracking-[-0.6px]">
            테스크메이트 200%
          </h1>
          <h1 className="text-inverse-normal text-xl font-bold tracking-[-0.6px]">
            활용하기
          </h1>
        </div>

        <Spacing size={40} />

        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex items-center justify-start gap-4">
            <Icon
              name="FlagBlue"
              size={24}
            />
            <span className="text-inverse-normal text-[16px] leading-[30px] font-bold tracking-[-0.48px]">
              목표 기반 진행도 시각화
            </span>
          </div>
          <div className="flex items-center justify-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                width="24"
                height="24"
                rx="8"
                fill="#DBD9FF"
              />
              <path
                d="M17.0921 12.5563C17.6444 12.5563 18.0998 13.0065 18.017 13.5526C17.8714 14.5131 17.5163 15.4342 16.972 16.2487C16.2417 17.3417 15.2038 18.1935 13.9893 18.6966C12.7749 19.1996 11.4386 19.3312 10.1494 19.0748C8.86013 18.8183 7.6759 18.1853 6.74642 17.2559C5.81694 16.3264 5.18395 15.1421 4.92751 13.8529C4.67107 12.5637 4.80268 11.2274 5.30571 10.0129C5.80874 8.79851 6.6606 7.76052 7.75355 7.03024C8.56805 6.486 9.48919 6.13087 10.4497 5.98524C10.9958 5.90246 11.446 6.35787 11.446 6.91016V11.5563C11.446 12.1086 11.8937 12.5563 12.446 12.5563H17.0921Z"
                fill="#6C63FF"
              />
              <path
                d="M7.45353 16.5487C7.063 16.9393 6.42263 16.943 6.09506 16.4983C5.51884 15.7161 5.11862 14.8137 4.92751 13.8529C4.67107 12.5637 4.80268 11.2274 5.30571 10.0129C5.80874 8.79851 6.6606 7.76052 7.75355 7.03024C8.56805 6.486 9.48919 6.13087 10.4497 5.98524C10.9958 5.90246 11.446 6.35787 11.446 6.91016V12.1421C11.446 12.4073 11.3406 12.6617 11.1531 12.8492L7.45353 16.5487Z"
                fill="#918AFF"
              />
              <path
                d="M12.5534 5.80078C12.5534 5.2485 13.0036 4.79309 13.5496 4.87587C14.0796 4.95623 14.5992 5.1006 15.0968 5.30669C15.9031 5.64069 16.6358 6.13024 17.2529 6.7474C17.8701 7.36455 18.3596 8.09721 18.6936 8.90356C18.8997 9.4011 19.0441 9.92067 19.1244 10.4507C19.2072 10.9967 18.7518 11.4469 18.1995 11.4469L13.5534 11.4469C13.0011 11.4469 12.5534 10.9992 12.5534 10.4469V5.80078Z"
                fill="#5A4FFF"
              />
            </svg>

            <span className="text-inverse-normal text-[16px] leading-[30px] font-bold tracking-[-0.48px]">
              상태별 작업 관리
            </span>
          </div>
          <div className="flex items-center justify-start gap-4">
            <Icon
              name="People"
              size={24}
            />
            <span className="text-inverse-normal text-[16px] leading-[30px] font-bold tracking-[-0.48px]">
              팀 기반 협업 주도
            </span>
          </div>
        </div>

        <Spacing size={8} />

        <Image
          src="/images/TodoListMockup.png"
          alt="Todo List Mockup"
          width={1469}
          height={1056}
          className="w-full"
        />
      </section>

      <section className="bg-background-normal-alternative-2 flex w-screen flex-col items-center justify-start gap-12 px-10 py-12">
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <span className="text-[16px] font-bold tracking-[-0.48px] text-green-900">
            목표 설정부터 기록까지
          </span>

          <h1 className="text-label-neutral text-xl font-bold tracking-[-0.6px]">
            쉽고 빠르게 할 일을 시작해요
          </h1>
        </div>

        <div className="col flex w-full items-center justify-start gap-4">
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <div className="bg-background-normal flex w-full flex-col items-center rounded-3xl px-4 py-6">
              <div className="shadow-[0_4px_16px_0_rgba(255, 158, 89, 0.20)] font-0bold text-inverse-normal flex h-7 w-7 items-center justify-center rounded-full bg-green-800 px-[13px] py-1 text-[16px] leading-[30px] tracking-[-0.48px]">
                1
              </div>

              <Spacing size={24} />

              <div className="flex h-[105px] w-[105px] items-center justify-center rounded-full bg-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="66"
                  height="66"
                  viewBox="0 0 66 66"
                  fill="none"
                >
                  <path
                    d="M27.9067 35.8695L27.9067 4.52004C27.9067 3.52953 28.7097 2.72656 29.7002 2.72656C30.6907 2.72656 31.4937 3.52953 31.4937 4.52004L31.4937 35.8695C31.4937 36.86 30.6907 37.663 29.7002 37.663C28.7097 37.663 27.9067 36.86 27.9067 35.8695Z"
                    fill="#2EC4B6"
                  />
                  <path
                    d="M26.2405 38.4129C29.3234 38.4129 29.3234 41.6264 32.4077 41.6264C35.4921 41.6264 35.4936 38.4129 38.5794 38.4129C41.6652 38.4129 41.6682 41.6264 44.7555 41.6264C46.9771 41.6264 47.6112 39.9751 48.9358 39.041L41.8271 26.3057C41.0965 24.9959 39.7139 24.1836 38.2126 24.1836H27.7849C26.2851 24.1836 24.9026 24.9959 24.1705 26.3057L16.6846 39.7167C17.5681 40.6077 18.3314 41.6264 20.0719 41.6264C23.1547 41.6264 23.1547 38.4129 26.2376 38.4129H26.2405Z"
                    fill="#FAFFFE"
                  />
                  <path
                    d="M59.9424 58.7576L48.9356 39.0383C47.611 39.9709 46.9769 41.6237 44.7554 41.6237C41.6666 41.6237 41.6666 38.4102 38.5792 38.4102C35.4919 38.4102 35.4934 41.6237 32.4076 41.6237C29.3217 41.6237 29.3247 38.4102 26.2404 38.4102C23.156 38.4102 23.1575 41.6237 20.0746 41.6237C18.3342 41.6237 17.5724 40.605 16.6874 39.714L6.05773 58.7576C4.51779 61.5168 6.51214 64.913 9.67222 64.913H56.328C59.4865 64.913 61.4809 61.5153 59.9424 58.7576Z"
                    fill="#2EC4B6"
                  />
                  <path
                    d="M44.4785 5.73828H31.5654V14.347H44.4785L42.6338 10.0426L44.4785 5.73828Z"
                    fill="#2EC4B6"
                  />
                  <path
                    d="M44.4782 4.30469C44.9604 4.30469 45.4107 4.54671 45.6762 4.94922C45.9416 5.35175 45.9865 5.86092 45.7967 6.30414L44.1938 10.0438L45.7967 13.7835C45.9865 14.2267 45.9416 14.7359 45.6762 15.1384C45.4107 15.5409 44.9604 15.7829 44.4782 15.7829H31.5652C30.7727 15.7829 30.1304 15.1406 30.1304 14.3482V5.73947C30.1304 4.94706 30.7727 4.30469 31.5652 4.30469H44.4782ZM32.9999 12.9134H42.3022L41.3144 10.6085C41.16 10.2479 41.16 9.83975 41.3144 9.47915L42.3022 7.17425H32.9999V12.9134Z"
                    fill="#2EC4B6"
                  />
                </svg>
              </div>

              <Spacing size={32} />

              <div className="flex flex-col items-center gap-4">
                <span className="text-label-neutral text-[18px] leading-[28px] font-bold tracking-[-0.54px]">
                  목표 설정하기
                </span>
                <span className="text-center text-[14px] leading-[20px] font-bold tracking-[-0.42px] text-gray-400">
                  달성하고 싶은 목표를 만들고
                  <br />
                  이름을 정하세요
                </span>
              </div>
            </div>

            <div className="bg-background-normal flex w-full flex-col items-center rounded-3xl px-4 py-6">
              <div className="shadow-[0_4px_16px_0_rgba(255, 158, 89, 0.20)] font-0bold text-inverse-normal flex h-7 w-7 items-center justify-center rounded-full bg-green-800 px-[13px] py-1 text-[16px] leading-[30px] tracking-[-0.48px]">
                2
              </div>

              <Spacing size={24} />

              <div className="flex h-[105px] w-[105px] items-center justify-center rounded-full bg-green-200">
                <svg
                  width="46"
                  height="60"
                  viewBox="0 0 46 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="6.88281"
                    width="45.8857"
                    height="52.7686"
                    rx="4.58858"
                    fill="#A5EAE3"
                  />
                  <rect
                    x="4.58838"
                    y="11.4688"
                    width="36.7086"
                    height="43.5914"
                    rx="2.29429"
                    fill="#FAFFFE"
                  />
                  <path
                    d="M11.4712 6.88281H34.414V16.06C34.414 17.3271 33.3869 18.3542 32.1198 18.3542H13.7655C12.4984 18.3542 11.4712 17.3271 11.4712 16.06V6.88281Z"
                    fill="#2EC4B6"
                  />
                  <circle
                    cx="22.9424"
                    cy="6.88286"
                    r="6.88286"
                    fill="#2EC4B6"
                  />
                  <circle
                    cx="22.9427"
                    cy="6.88413"
                    r="2.29429"
                    fill="#D5F5F2"
                  />
                  <rect
                    x="18.3228"
                    y="24.5469"
                    width="17.82"
                    height="3.3"
                    rx="1.65"
                    fill="#C5F1ED"
                  />
                  <rect
                    x="18.3228"
                    y="42.3672"
                    width="17.82"
                    height="3.3"
                    rx="1.65"
                    fill="#C5F1ED"
                  />
                  <rect
                    x="18.3228"
                    y="33.125"
                    width="17.82"
                    height="3.3"
                    rx="1.65"
                    fill="#C5F1ED"
                  />
                  <path
                    d="M10.6958 25.7282L12.2104 27.2428C12.307 27.3394 12.4638 27.3394 12.5604 27.2428L15.3891 24.4141"
                    stroke="#2EC4B6"
                    stroke-width="2.64"
                    stroke-linecap="round"
                  />
                  <path
                    d="M10.6958 43.5485L12.2104 45.0631C12.307 45.1598 12.4638 45.1598 12.5604 45.0631L15.3891 42.2344"
                    stroke="#2EC4B6"
                    stroke-width="2.64"
                    stroke-linecap="round"
                  />
                  <path
                    d="M10.6958 34.3063L12.2104 35.8209C12.307 35.9176 12.4638 35.9176 12.5604 35.8209L15.3891 32.9922"
                    stroke="#2EC4B6"
                    stroke-width="2.64"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <Spacing size={32} />

              <div className="flex flex-col items-center gap-4">
                <span className="text-label-neutral text-[18px] leading-[28px] font-bold tracking-[-0.54px]">
                  할 일 추가하기
                </span>
                <span className="text-center text-[14px] leading-[20px] font-bold tracking-[-0.42px] text-gray-400">
                  스페이스 별 목표에 맞는
                  <br />할 일을 추가하세요
                </span>
              </div>
            </div>

            <div className="bg-background-normal flex w-full flex-col items-center rounded-3xl px-4 py-6">
              <div className="shadow-[0_4px_16px_0_rgba(255, 158, 89, 0.20)] font-0bold text-inverse-normal flex h-7 w-7 items-center justify-center rounded-full bg-green-800 px-[13px] py-1 text-[16px] leading-[30px] tracking-[-0.48px]">
                3
              </div>

              <Spacing size={24} />

              <div className="flex h-[105px] w-[105px] items-center justify-center rounded-full bg-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43"
                  height="54"
                  viewBox="0 0 43 54"
                  fill="none"
                >
                  <rect
                    y="2.33984"
                    width="42.12"
                    height="51.48"
                    rx="4.68"
                    fill="#75DFD5"
                  />
                  <path
                    d="M0 7.01984C0 4.43515 2.09531 2.33984 4.68 2.33984H37.44C40.0247 2.33984 42.12 4.43515 42.12 7.01985V14.0398H0V7.01984Z"
                    fill="#FAFFFE"
                  />
                  <rect
                    x="7.05713"
                    y="21.5117"
                    width="28.2"
                    height="4.2"
                    fill="#2AB4A7"
                  />
                  <rect
                    x="7.05713"
                    y="31.1133"
                    width="28.2"
                    height="4.2"
                    fill="#2AB4A7"
                  />
                  <rect
                    x="7.05713"
                    y="40.7109"
                    width="28.2"
                    height="4.2"
                    fill="#2AB4A7"
                  />
                  <rect
                    x="35.1001"
                    width="7.02"
                    height="4.68"
                    rx="2.34"
                    transform="rotate(90 35.1001 0)"
                    fill="#2EC4B6"
                  />
                  <rect
                    x="23.3999"
                    width="7.02"
                    height="4.68"
                    rx="2.34"
                    transform="rotate(90 23.3999 0)"
                    fill="#2EC4B6"
                  />
                  <rect
                    x="11.7002"
                    width="7.02"
                    height="4.68"
                    rx="2.34"
                    transform="rotate(90 11.7002 0)"
                    fill="#2EC4B6"
                  />
                </svg>
              </div>

              <Spacing size={32} />

              <div className="flex flex-col items-center gap-4">
                <span className="text-label-neutral text-[18px] leading-[28px] font-bold tracking-[-0.54px]">
                  진행상황 관리하기
                </span>
                <span className="text-center text-[14px] leading-[20px] font-bold tracking-[-0.42px] text-gray-400">
                  팀원들과 함께 목표를 관리하고
                  <br />
                  진행상황을 확인하세요
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-screen flex-col items-center gap-8 bg-blue-800 py-[56px]">
        <Image
          src="/images/MessageGroup.png"
          alt="Message Group"
          width={688}
          height={475}
          className="w-[159px]"
        />
        <div className="flex flex-col items-center justify-start gap-3">
          <span className="text-[14px] leading-[24px] font-semibold tracking-[-0.42px] text-blue-400">
            다양한 팀 스페이스
          </span>

          <span className="text-inverse-normal text-center text-[18px] leading-[24px] font-semibold tracking-[-0.54px]">
            여러 팀에 속해있다면
            <br />
            팀별로 페이지를 관리할 수 있어요
          </span>
        </div>
      </section>

      <section className="bg-background-normal w-full px-5 py-6">
        <div className="relative flex h-[220px] flex-col items-center justify-center gap-6 rounded-3xl bg-blue-100">
          <div className="flex flex-col items-center justify-start gap-1">
            <span className="text-[14px] leading-[24px] font-semibold tracking-[-0.42px] text-blue-800">
              개인 할일부터 팀 목표까지
            </span>
            <span className="text-label-neutral text-[18px] leading-[24px] font-bold tracking-[-0.54px]">
              테스크메이트로 만들고 관리해보세요
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-[100px]"
          >
            시작하기
          </Button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            className="absolute top-[40px] left-[27px] z-10 rotate-15 opacity-40"
          >
            <g opacity="0.4">
              <path
                d="M7.60604 28.5894L13.5215 6.51255C13.5557 6.38503 13.6174 6.14575 13.7034 5.93961C13.8059 5.69389 14.0182 5.30163 14.4758 5.03744C14.9334 4.77325 15.3793 4.78552 15.6434 4.81955C15.8649 4.84814 16.103 4.91437 16.2305 4.94854L22.064 6.51164C22.2137 6.55174 22.5991 6.63534 22.9588 6.85574L23.1114 6.95925L23.2516 7.07583C23.5628 7.36082 23.7491 7.70866 23.829 7.84178L25.4012 10.459L34.2253 12.8234C34.3498 12.8568 34.6081 12.9218 34.8225 13.0147C35.0278 13.1036 35.5702 13.3756 35.7877 14.0307L35.8256 14.1675L35.854 14.3063C35.9603 14.9885 35.6026 15.4785 35.4607 15.6515C35.3125 15.8322 35.1124 16.0081 35.017 16.0946L29.8254 20.8039L31.9668 27.478C32.0062 27.6007 32.0915 27.8531 32.1295 28.0837C32.1683 28.3191 32.2388 28.9893 31.7035 29.5513C31.1681 30.1132 30.4955 30.0754 30.2585 30.0481C30.0263 30.0213 29.7701 29.9485 29.6456 29.9152L20.8215 27.5508C20.6504 27.5049 20.1708 27.4021 19.7741 27.1032C19.378 26.8046 19.1479 26.373 19.0565 26.2206L17.4843 23.6034L12.3629 22.2312L10.4547 29.3527C10.2439 30.1394 9.43534 30.6062 8.64872 30.3954C7.86209 30.1846 7.39527 29.3761 7.60604 28.5894ZM30.1406 28.0621L29.2092 28.3611L30.142 28.0625L29.5692 27.5184L30.1406 28.0621ZM13.1262 19.3825L18.2476 20.7548C18.3972 20.7949 18.7827 20.8785 19.1423 21.0989L19.295 21.2024L19.4352 21.319C19.7463 21.604 19.9327 21.9518 20.0126 22.0849L21.5848 24.7022L28.5812 26.5768L26.8739 21.2534C26.8483 21.1734 26.7912 21.0043 26.7575 20.8421C26.7167 20.6453 26.6803 20.3402 26.7751 19.9866C26.8698 19.6329 27.0539 19.387 27.1876 19.2369C27.2979 19.1132 27.4319 18.9953 27.4941 18.9389L31.6343 15.1823L24.6379 13.3076C24.4669 13.2618 23.9872 13.159 23.5906 12.86C23.1945 12.5614 22.9643 12.1298 22.8729 11.9775L21.3008 9.36028L16.1793 7.988L13.1262 19.3825Z"
                fill="#75DFD5"
              />
              <path
                d="M14.9454 6.88794L11.5106 19.7068C11.4207 20.0425 11.3757 20.2104 11.452 20.3426C11.5284 20.4748 11.6962 20.5198 12.0319 20.6098L17.8657 22.1729C18.1499 22.2491 18.292 22.2871 18.4065 22.3734C18.521 22.4597 18.5967 22.5858 18.7482 22.8381L20.3196 25.4549C20.4711 25.7071 20.5468 25.8332 20.6613 25.9195C20.7758 26.0058 20.9179 26.0439 21.2021 26.12L30.0269 28.4846C30.3725 28.5773 30.5454 28.6236 30.636 28.5285C30.7265 28.4334 30.6719 28.263 30.5626 27.9223L30.5626 27.9222L28.2772 20.7962C28.2068 20.5767 28.1716 20.4669 28.1996 20.3621C28.2277 20.2574 28.3131 20.1799 28.4838 20.025L34.0261 14.9964C34.2911 14.7559 34.4236 14.6357 34.3927 14.508C34.3618 14.3804 34.189 14.3341 33.8433 14.2415L25.0185 11.8769C24.7343 11.8007 24.5922 11.7627 24.4777 11.6764C24.3632 11.5901 24.2875 11.4639 24.136 11.2117L22.5646 8.59494C22.4132 8.34269 22.3374 8.21656 22.2229 8.13027C22.1084 8.04398 21.9663 8.0059 21.6821 7.92975L15.8484 6.3666C15.5127 6.27665 15.3448 6.23167 15.2126 6.30802C15.0803 6.38437 15.0354 6.55222 14.9454 6.88794Z"
                fill="#75DFD5"
              />
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            className="absolute top-[33px] right-[16px] z-10 rotate-15 opacity-40"
          >
            <g opacity="0.4">
              <path
                d="M29.548 8.41835C31.5146 8.94529 32.6816 10.9667 32.1547 12.9332L29.6104 22.4287L23.6757 20.8385C22.87 20.6226 22.1469 20.4257 21.5436 20.348C20.905 20.2657 20.2212 20.2894 19.5644 20.6686C18.9076 21.0478 18.5451 21.6282 18.2971 22.2224C18.0628 22.7837 17.8718 23.5083 17.6559 24.3141L16.0657 30.2487L6.57024 27.7044C4.60367 27.1775 3.43662 25.1561 3.96356 23.1895L8.41608 6.57251C8.94302 4.60594 10.9644 3.43889 12.931 3.96583L29.548 8.41835ZM28.6498 24.7156C28.372 25.0525 28.037 25.3437 27.6516 25.5662L19.7623 30.1211C19.3768 30.3437 18.9572 30.4882 18.5265 30.5602L20.0297 24.9501C20.2636 24.0773 20.4094 23.5427 20.5653 23.1693C20.7074 22.8288 20.7887 22.7993 20.7931 22.7967C20.7974 22.7942 20.8637 22.7386 21.2296 22.7857C21.6309 22.8375 22.1668 22.9785 23.0397 23.2124L28.6498 24.7156Z"
                fill="#7E77FF"
              />
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="53"
            viewBox="0 0 53 53"
            fill="none"
            className="absolute bottom-[32px] left-[27px] z-10 rotate-[-15deg] opacity-40"
          >
            <g
              opacity="0.4"
              clip-path="url(#clip0_1043_60715)"
            >
              <path
                d="M23.3491 28.6771L18.1213 9.16694C17.9562 8.5505 18.322 7.91688 18.9384 7.75171C19.5549 7.58653 20.1885 7.95235 20.3537 8.56879L25.5814 28.079C25.7466 28.6954 25.3808 29.329 24.7643 29.4942C24.1479 29.6594 23.5143 29.2936 23.3491 28.6771Z"
                fill="#7E77FF"
              />
              <path
                d="M22.7365 30.5393C24.6551 30.0253 25.1909 32.0252 27.1105 31.5109C29.03 30.9965 28.495 28.9963 30.4155 28.4818C32.3359 27.9672 32.8737 29.9666 34.7951 29.4518C36.1776 29.0813 36.2969 27.9479 36.9655 27.1457L30.4177 20.4053C29.7446 19.712 28.7487 19.437 27.8144 19.6874L21.3248 21.4263C20.3913 21.6764 19.6664 22.4125 19.4292 23.3497L17.0068 32.9443C17.7052 33.3515 18.3501 33.8582 19.4333 33.5679C21.3519 33.0539 20.816 31.0539 22.7346 30.5398L22.7365 30.5393Z"
                fill="#DBD9FF"
              />
              <path
                d="M47.1036 37.5851L36.9652 27.1483C36.2964 27.9496 36.1774 29.0839 34.7948 29.4544C32.8725 29.9695 32.3366 27.9695 30.4152 28.4844C28.4938 28.9992 29.0306 30.9989 27.1102 31.5135C25.1897 32.0281 24.6557 30.0276 22.7362 30.542C20.8167 31.0563 21.3535 33.056 19.4349 33.5701C18.3517 33.8603 17.7077 33.3534 17.0083 32.9464L13.5687 46.5707C13.0704 48.5447 14.8779 50.3257 16.8446 49.7987L45.8806 42.0186C47.8463 41.4918 48.5209 39.0447 47.1036 37.5851Z"
                fill="#918AFF"
              />
              <path
                d="M28.6379 7.16307L20.6016 9.31641L22.0371 14.674L30.0735 12.5207L28.2077 10.1495L28.6379 7.16307Z"
                fill="#7E77FF"
              />
              <path
                d="M28.3985 6.26756C28.6986 6.18714 29.0192 6.26268 29.2516 6.4689C29.4839 6.67516 29.5967 6.98455 29.5525 7.29204L29.1786 9.88671L30.7998 11.9468C30.9918 12.191 31.0488 12.5153 30.9507 12.8101C30.8526 13.1049 30.6127 13.3306 30.3126 13.411L22.2762 15.5643C21.7831 15.6965 21.2762 15.4038 21.1441 14.9107L19.7085 9.55309C19.5764 9.05993 19.869 8.55304 20.3622 8.4209L28.3985 6.26756ZM22.6907 13.5392L28.4799 11.988L27.4808 10.7183C27.3246 10.5196 27.2565 10.2656 27.2924 10.0154L27.5228 8.41628L21.7336 9.9675L22.6907 13.5392Z"
                fill="#7E77FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_1043_60715">
                <rect
                  width="42.5238"
                  height="42.5238"
                  fill="white"
                  transform="translate(0 11.0078) rotate(-15)"
                />
              </clipPath>
            </defs>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            className="absolute right-[19px] bottom-[33px] z-10 rotate-[-9deg] opacity-40"
          >
            <g opacity="0.4">
              <path
                d="M8.77406 11.7441C9.37089 10.9194 10.523 10.7348 11.3476 11.3316C12.1723 11.9284 12.3569 13.0805 11.7601 13.9052L8.70358 18.1285C8.10676 18.9532 6.95469 19.1378 6.13003 18.541C5.30537 17.9442 5.12071 16.7921 5.71754 15.9675L8.77406 11.7441Z"
                fill="#FF6B8A"
              />
              <path
                d="M36.8275 7.24588C36.0028 6.64906 34.8508 6.83372 34.2539 7.65838C33.6571 8.48304 33.8418 9.6351 34.6664 10.2319L38.8898 13.2885C39.7144 13.8853 40.8665 13.7006 41.4633 12.876C42.0602 12.0513 41.8755 10.8992 41.0508 10.3024L36.8275 7.24588Z"
                fill="#FF6B8A"
              />
              <path
                d="M23.0056 10.7807C31.0466 9.49187 38.6103 14.9654 39.8994 23.0062C41.1883 31.0474 35.714 38.6114 27.6729 39.9002C19.632 41.1888 12.0687 35.7145 10.7799 27.6736C9.49135 19.6328 14.9649 12.0697 23.0056 10.7807ZM29.1589 18.6027C28.2736 18.101 27.1484 18.412 26.6464 19.2972L24.569 22.9602L20.0629 20.8983C19.1374 20.4751 18.0439 20.8827 17.6204 21.8081C17.197 22.7336 17.6038 23.8271 18.5292 24.2507L24.188 26.8399C25.2747 27.337 26.5613 26.9208 27.1508 25.8814L29.8534 21.1153C30.3554 20.2298 30.0444 19.1048 29.1589 18.6027Z"
                fill="#FF6B8A"
              />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}
