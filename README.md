# pdf-extractor-server

### This is the backend of PDF Extractor project. Here is the link of frontend - https://github.com/piyushdahiya1218/pdf-extractor

I'm using IronPDF library to remove pages from original PDF file. This library is not free of cost and thus gives a watermark in the converted PDF file. This watermark can be removed by purchasing a licence of their library. Alternatively, some other library could also be used.

When the backend gets a request to convert the original PDF for the very first time, it downloads **IronPDF Engine** which is a part of IronPDF library, to delete selected pages and return new pdf. It can take upto **1 minute** to download and extract this Engine depending upon the internet connection. Once this Engine setup is done, all the subsequest requests to convert the PDF take only upto 5 seconds!

Steps to setup the backend - 
1. Clone the repository using command `git clone https://github.com/piyushdahiya1218/pdf-extractor-server.git`
2. Open the project in VS Code.
3. Open terminal (make sure to `cd` into the project) and run command `npm install`.
4. After node_modules are installed, run `npm start` to start the server on localhost port **5000**. If you already have something else running on this port then either kill that process or change the port by going into the file *www* inside *bin* folder and change the port number.
5. After server is started successfully, open this address `localhost:5000` (change port number if running on some other port) to make sure the server is running.

Please keep the terminal open in VS Code after starting the server to view download and extraction progress of **IronPDF Engine**.
