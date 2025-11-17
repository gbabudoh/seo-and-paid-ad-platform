# Onboarding Setup Troubleshooting Guide

## Common Issues and Solutions

### 1. **"Unauthorized" Error (401)**
**Problem:** User is not logged in when trying to complete onboarding.

**Solution:**
- Make sure you're logged in before accessing `/onboarding`
- After registration, you should be automatically redirected to `/onboarding`
- If not logged in, go to `/login` first

### 2. **Validation Errors**
**Problem:** Form data doesn't meet validation requirements.

**Common Issues:**
- **Target Countries:** Must be valid 2-character ISO codes (e.g., US, GB, CA)
- **ROI Value:** Must be a positive number (e.g., 3 for 3x ROAS, 50 for 50 leads)
- **Website:** Must be a valid URL (include http:// or https://)
- **All Required Fields:** Company name, website, industry, package tier, ROI type, and ROI value are required

**Solution:**
- Check the error message displayed in red at the top of the form
- Ensure all fields are filled correctly
- For target countries, use comma-separated 2-letter codes: `US,GB,CA`

### 3. **Database Connection Error**
**Problem:** MongoDB is not running or connection string is incorrect.

**Solution:**
- Check if MongoDB is running: `mongod --version`
- Verify `.env.local` has correct `MONGODB_URI`
- For local MongoDB: `mongodb://localhost:27017/seo-paid-ad-platform`
- Test connection: Visit `/api/data/test`

### 4. **"Client profile already exists" Error**
**Problem:** User already has a client profile.

**Solution:**
- If you've already completed onboarding, go directly to `/dashboard`
- To reset, delete the client record from MongoDB or use admin panel

### 5. **Silent Failures (No Error Shown)**
**Problem:** Error occurred but wasn't displayed.

**Solution:**
- Check browser console (F12) for errors
- Check server logs in terminal
- Error messages should now appear in red at the top of the form

## Testing the Onboarding Flow

### Step-by-Step Test:

1. **Register a new account:**
   - Go to `/register`
   - Fill in name, email, password (must meet requirements)
   - Submit form

2. **Complete Onboarding:**
   - Should redirect to `/onboarding` after registration
   - Fill Step 1: Company name, website, industry
   - Fill Step 2: Target countries (e.g., `US,GB`), preferred language
   - Fill Step 3: Package tier, ROI type, ROI value (numeric)
   - Click "Complete Setup"

3. **Expected Result:**
   - Redirects to `/dashboard`
   - Client profile created in database

## Debug Checklist

- [ ] User is logged in (check session)
- [ ] MongoDB is running and accessible
- [ ] `.env.local` file exists with correct `MONGODB_URI`
- [ ] All required fields are filled
- [ ] Target countries are valid 2-character codes
- [ ] ROI value is a positive number
- [ ] Website URL is valid (includes http:// or https://)
- [ ] Check browser console for JavaScript errors
- [ ] Check server terminal for API errors

## Error Messages Reference

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Unauthorized" | Not logged in | Log in first |
| "Validation failed" | Invalid form data | Check all fields meet requirements |
| "Password does not meet requirements" | Password too weak | Use 8+ chars with uppercase, lowercase, number |
| "Client profile already exists" | Duplicate onboarding | Go to dashboard instead |
| "Internal server error" | Server/database issue | Check MongoDB connection and server logs |

## Quick Fixes

### Clear Form and Retry:
1. Refresh the page
2. Fill all fields carefully
3. Ensure target countries are comma-separated: `US,GB,CA`
4. Ensure ROI value is numeric: `3` not `3x`

### Reset Onboarding:
If you need to start over:
1. Delete your user account from database, OR
2. Delete the client record associated with your user ID

## Still Having Issues?

1. Check the browser console (F12 → Console tab)
2. Check the Network tab for API request/response
3. Check server terminal for detailed error logs
4. Verify MongoDB connection: `curl http://localhost:3000/api/data/test`

