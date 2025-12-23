FROM node:20-slim

WORKDIR /app

# Install build dependencies (Debian-based)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ wget && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# Install ALL dependencies (including dev) for AdminJS component bundling
RUN npm ci

COPY . .

# Create upload directories
RUN mkdir -p uploads/culinary uploads/restaurants uploads/menus uploads/users

# Copy pre-built AdminJS bundle to safe location BEFORE running any scripts
# The local repo has a working 31KB bundle created on the dev machine
# This MUST happen before any scripts that might overwrite .adminjs/
RUN mkdir -p .adminjs-prebuilt && \
    if [ -f .adminjs/components.bundle.js ]; then \
    cp .adminjs/components.bundle.js .adminjs-prebuilt/components.bundle.js && \
    echo "✅ Saved pre-built bundle: $(wc -c < .adminjs-prebuilt/components.bundle.js) bytes"; \
    elif [ -f .adminjs/bundle.js ]; then \
    cp .adminjs/bundle.js .adminjs-prebuilt/components.bundle.js && \
    echo "✅ Saved fallback bundle: $(wc -c < .adminjs-prebuilt/components.bundle.js) bytes"; \
    fi

# Make start script executable
RUN chmod +x start.sh

EXPOSE 5050

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5050/ || exit 1

# Use startup script which copies bundle before starting server
CMD ["./start.sh"]
