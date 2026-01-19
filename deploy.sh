#!/bin/bash

# MoveWell Deployment Quick Script
# This script helps you deploy to Vercel

echo "🚀 MoveWell Deployment Helper"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: MoveWell health assessment app"
    echo "✅ Git repository initialized"
    echo ""
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
    echo ""
fi

echo "🔗 Logging in to Vercel..."
vercel login

echo ""
echo "🏗️  Building your project..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
vercel

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is now live! 🎉"
echo ""
echo "📖 For custom domain setup and advanced options,"
echo "   visit: https://vercel.com/docs"
