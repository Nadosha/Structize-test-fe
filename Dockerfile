FROM node:18-alpine as base
WORKDIR /apps/structize-assignment-fe
ENV PATH /apps/structize-assignment-fe/node_modules/.bin:$PATH
FROM base as deps
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base as builder
COPY --from=deps /apps/structize-assignment-fe/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base as runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /apps/structize-assignment-fe/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /apps/structize-assignment-fe/.next/static ./.next/static
COPY --from=builder /apps/structize-assignment-fe/public ./public

EXPOSE 3000
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node", "./server.js"]