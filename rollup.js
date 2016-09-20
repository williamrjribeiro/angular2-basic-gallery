import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'aot/js/app/main.aot.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: 'node_modules/rxjs/**',
      }),
      uglify({
        mangle: true,
	      compress: {
		        sequences: true,
		        dead_code: true,
		        conditionals: true,
		        booleans: true,
		        unused: true,
		        if_return: true,
		        join_vars: true,
		        drop_console: true
	      }
      })
  ]
}
