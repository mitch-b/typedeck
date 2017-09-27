// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'build/module/index.js',
    sourcemap: true,
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs()
    ]
}
