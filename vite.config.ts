import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import dotenv from 'dotenv';
import dts from 'vite-plugin-dts';


dotenv.config();

const rootPath = './src'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts()],
	resolve: {
		alias: {
			"@core": path.resolve(__dirname, rootPath, `@core`),
			"@presentation": path.resolve(__dirname, rootPath, `@presentation`),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			name: '@m4rc310/core',
			fileName: (format) => `index.${format}.ts`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		},
		sourcemap: true,
		emptyOutDir: true,

	}
})