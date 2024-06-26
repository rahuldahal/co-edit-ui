import { debounce } from 'lodash';
import AceEditor from 'react-ace';
import { useEffect, useMemo } from 'react';
import useAuthStore from '@/store/auth.store';
import { Navigate } from '@tanstack/react-router';
import { ProjectsFilesBox } from './projects-manager';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const editorStyle = {
  width: '80vw',
  height: 'calc(100vh - (2rem + 2.5rem))',
  // position: 'relative',
  // top: '-72px',
};

export default function Editor() {
  const { isAuthenticated, isLoading, fetchAccessToken } = useAuthStore();

  // Use useMemo to create a memoized version of the debounced function
  const debouncedSendChange = useMemo(() => debounce(sendChange, 1000), []);

  useEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  if (isLoading) {
    return <h1 className="text-2xl">Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  function onLoad(e: any) {
    console.log('loaded', e);
  }

  function sendChange(newValue: string) {
    console.log('send value via websockets', newValue);
  }

  function onChange(newValue: string) {
    debouncedSendChange(newValue);
  }

  return (
    <>
      <ProjectsFilesBox />
      <AceEditor
        style={editorStyle}
        placeholder="Write your code here"
        mode="javascript"
        theme="monokai"
        name="Co Edit"
        onLoad={onLoad}
        onChange={onChange}
        fontSize={18}
        lineHeight={24}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
}
