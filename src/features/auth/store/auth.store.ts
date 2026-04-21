/**
 * @description Zustand auth store 작성 방법
 *
 * 1. create<타입>()( ... ) 으로 스토어 생성
 * 2. persist( ... ) 로 감싸면 새로고침해도 상태 유지 (localStorage에 저장)
 * 3. immer( ... ) 로 감싸면 상태를 직접 수정하듯 작성 가능
 *
 * @example 사용 방법
 * // 읽기
 * const user = useAuthStore((state) => state.user)
 *
 * // 로그인 시
 * const { setUser } = useAuthStore()
 * setUser({ id: '1', name: 'Zaenny', email: 'z@email.com', profileImage: null })
 *
 * // 로그아웃 시
 * const { clearUser } = useAuthStore()
 * clearUser()
 */

import { create } from "zustand";
import { persist } from "zustand/middleware"; // 새로고침해도 상태가 유지되게 해주는 미들웨어
import { immer } from "zustand/middleware/immer"; // 상태 업데이트를 직접 수정하듯 쓸 수 있게 해주는 미들웨어

type User = {
  name: string;
  email: string;
  profileImage: string | null;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void; // 유저 정보
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    // persist가 아래 스토어 전체를 감싸서 localStorage에 자동 저장해줌
    immer((set) => ({
      user: null,

      setUser: (user) => {
        // immer 덕분에 set 안에서 직접 수정하는 것처럼 쓸 수 있음
        set((state) => {
          state.user = user;
        });
      },

      clearUser: () => {
        set((state) => {
          state.user = null;
        });
      },
    })),
    {
      name: "taskmate-auth", // localStorage에 저장될 키 이름 (앱 내에서 고유해야 함)
      // 새로고침해도 user 정보가 남아있는 이유가 바로 이것!
    },
  ),
);
