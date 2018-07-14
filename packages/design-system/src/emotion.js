import createEmotion from 'create-emotion'
import varsPlugin from 'stylis-custom-properties'

const emotion = createEmotion({}, { key: 'lc', stylisPlugins: [varsPlugin] })
export default emotion

const { css, cx, injectGlobal, keyframes } = emotion
export { css, cx, injectGlobal, keyframes }