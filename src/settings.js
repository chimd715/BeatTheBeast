import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = 'hobodang-setting:';
const CHANGE_EVENT = 'hobodang-setting-change';

export const SETTING_KEYS = {
  SHOW_HEALTH_NUMBER: 'showHealthNumber',
};

const readSetting = (key, defaultValue) => {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    return raw === null ? defaultValue : JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
};

const writeSetting = (key, value) => {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    // localStorage를 쓸 수 없는 환경에서도 같은 탭 안에서는 동기화되도록 이벤트는 보낸다.
  }
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, { detail: { key, value } })
  );
};

// localStorage에 저장되는 설정값 hook. 같은 탭의 다른 컴포넌트와 다른 탭 모두 동기화된다.
export const useSetting = (key, defaultValue) => {
  const [value, setValue] = useState(() => readSetting(key, defaultValue));

  useEffect(() => {
    const handleChange = (event) => {
      if (event.detail?.key === key) setValue(event.detail.value);
    };
    const handleStorage = (event) => {
      if (event.key === STORAGE_PREFIX + key) {
        setValue(readSetting(key, defaultValue));
      }
    };
    window.addEventListener(CHANGE_EVENT, handleChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [key, defaultValue]);

  const updateValue = useCallback(
    (nextValue) => {
      const resolved =
        typeof nextValue === 'function'
          ? nextValue(readSetting(key, defaultValue))
          : nextValue;
      setValue(resolved);
      writeSetting(key, resolved);
    },
    [key, defaultValue]
  );

  return [value, updateValue];
};
