import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Map, 
  AlignLeft, 
  X, 
  Info, 
  Calendar,
  Layers,
  BookOpen,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Coordinates layout for 2200x1200 canvas
// Center of canvas is (1100, 600)
const MINDMAP_NODES = {
  id: 'root',
  label: 'CÁCH MẠNG THÁNG TÁM 1945',
  x: 1100,
  y: 600,
  type: 'root',
  color: 'bg-gradient-to-r from-museum-red to-red-950 border-museum-gold text-white shadow-xl ring-4 ring-museum-red/20',
  periodId: 'overview',
  details: {
    title: 'Tổng khởi nghĩa Cách mạng Tháng Tám (1945)',
    summary: 'Đỉnh cao chói lọi của toàn bộ tiến trình lịch sử đấu tranh cách mạng giành độc lập dân tộc giai đoạn 1930 - 1945 dưới sự lãnh đạo của Đảng Cộng sản Việt Nam. Cuộc Tổng khởi nghĩa đã đập tan ách thống trị của thực dân Pháp hơn 80 năm và phong kiến ngàn năm, giành độc lập tự do cho tổ quốc.',
    dates: '14/08/1945 - 02/09/1945',
    figures: 'Hồ Chí Minh, Trường Chinh, Võ Nguyên Giáp...'
  },
  children: [
    // LEFT SIDE: Background and Build-up (1930 - 1941)
    {
      id: 'branch-1',
      label: '1. Phong trào CM 1930 - 1931',
      x: 680,
      y: 180,
      type: 'branch',
      side: 'left',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p1',
      details: {
        title: 'Phong trào Cách mạng 1930 - 1931 & Xô Viết Nghệ Tĩnh',
        summary: 'Phong trào cách mạng đầu tiên do Đảng Cộng sản Việt Nam lãnh đạo ngay sau khi ra đời. Đỉnh cao là sự thành lập chính quyền tự quản Xô viết Nghệ - Tĩnh của quần chúng công nông.',
        dates: '1930 - 1931',
        figures: 'Trần Phú, Nguyễn Ái Quốc...'
      },
      children: [
        {
          id: '1-1',
          label: 'Bối cảnh lịch sử',
          x: 260,
          y: 60,
          type: 'leaf',
          details: {
            title: 'Khủng hoảng kinh tế & Đảng ra đời',
            summary: 'Khủng hoảng kinh tế thế giới (1929-1933) ảnh hưởng sâu sắc đến Đông Dương. Ngày 3/2/1930, Đảng Cộng sản Việt Nam ra đời, kịp thời lãnh đạo quần chúng đấu tranh trước làn sóng khủng bố trắng của thực dân Pháp.',
            dates: 'Đầu năm 1930'
          }
        },
        {
          id: '1-2',
          label: 'Chủ trương cách mạng',
          x: 260,
          y: 120,
          type: 'leaf',
          details: {
            title: 'Chương trình & Luận cương chính trị',
            summary: 'Đảng vạch ra Cương lĩnh chính trị đầu tiên (2/1930) và Luận cương chính trị (10/1930) xác định rõ nhiệm vụ chiến lược: chống đế quốc thực dân và phong kiến tay sai, giành độc lập dân tộc và ruộng đất cho dân cày.',
            dates: 'Tháng 10/1930',
            figures: 'Trần Phú (khởi thảo)'
          }
        },
        {
          id: '1-3',
          label: 'Phong trào đấu tranh',
          x: 260,
          y: 180,
          type: 'leaf',
          details: {
            title: 'Công nhân & Nông dân liên minh đấu tranh',
            summary: 'Làn sóng bãi công của công nhân (Vinh, Bến Thủy, xi măng Hải Phòng...) kết hợp với biểu tình cướp chính quyền địa phương của nông dân toàn quốc nhân ngày Quốc tế Lao động 1/5/1930.',
            dates: 'Năm 1930'
          }
        },
        {
          id: '1-4',
          label: 'Xô Viết Nghệ Tĩnh',
          x: 260,
          y: 240,
          type: 'leaf',
          details: {
            title: 'Chính quyền Cách mạng đầu tiên',
            summary: 'Tại Nghệ An và Hà Tĩnh, phong trào đạt đỉnh cao. Quần chúng đập tan bộ máy quan lại tay sai, lập chính quyền Xô viết tự quản để chia ruộng đất, xóa nợ thuế và giữ gìn trật tự trị an.',
            dates: 'Tháng 9/1930'
          }
        },
        {
          id: '1-5',
          label: 'Ý nghĩa phong trào',
          x: 260,
          y: 300,
          type: 'leaf',
          details: {
            title: 'Cuộc Tổng diễn tập lần thứ nhất',
            summary: 'Khẳng định trong thực tiễn quyền lãnh đạo của Đảng và liên minh công nông kiên cường. Phong trào được xem là cuộc tổng diễn tập đầu tiên chuẩn bị cho Cách mạng Tháng Tám.',
            dates: '1930 - 1931'
          }
        }
      ]
    },
    {
      id: 'branch-2',
      label: '2. Khôi phục phong trào (1932-1935)',
      x: 680,
      y: 460,
      type: 'branch',
      side: 'left',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p1',
      details: {
        title: 'Khôi phục Phong trào Cách mạng (1932 - 1935)',
        summary: 'Vượt qua giai đoạn Pháp khủng bố trắng tàn bạo, các chiến sĩ cộng sản kiên cường củng cố lực lượng, tổ chức đấu tranh trong nhà tù và phục hồi tổ chức Đảng từ hải ngoại về trong nước.',
        dates: '1932 - 1935',
        figures: 'Lê Hồng Phong, Nguyễn Thị Minh Khai...'
      },
      children: [
        {
          id: '2-1',
          label: 'Khôi phục tổ chức Đảng',
          x: 260,
          y: 370,
          type: 'leaf',
          details: {
            title: 'Tái thiết các chi bộ bí mật',
            summary: 'Các đảng viên kiên trung chắp nối liên lạc khắp ba kỳ, phát hành Chương trình hành động (6/1932) để tập hợp lực lượng cách mạng vững bước đi tiếp.'
          }
        },
        {
          id: '2-2',
          label: 'Hoạt động đấu tranh trong tù',
          x: 260,
          y: 430,
          type: 'leaf',
          details: {
            title: 'Biên nhà tù thành trường học cách mạng',
            summary: 'Tại Hỏa Lò, Sơn La, Côn Đảo... các đảng viên bị bắt giam vẫn tổ chức học lý luận, viết báo bí mật, giữ vững ngọn lửa cách mạng sắt đá đấu tranh chống chế độ lao dịch tàn bạo.'
          }
        },
        {
          id: '2-3',
          label: 'Ban lãnh đạo hải ngoại',
          x: 260,
          y: 490,
          type: 'leaf',
          details: {
            title: 'Ban Chỉ huy ở ngoài của Đảng (1934)',
            summary: 'Thành lập tại Quảng Châu (Trung Quốc) do Lê Hồng Phong phụ trách, làm nhiệm vụ liên lạc với Quốc tế Cộng sản, huấn luyện cán bộ và chỉ đạo khôi phục các ban trị sự trong nước.',
            dates: 'Tháng 3/1934',
            figures: 'Lê Hồng Phong'
          }
        },
        {
          id: '2-4',
          label: 'Đại hội I (3/1935 - Ma Cao)',
          x: 260,
          y: 550,
          type: 'leaf',
          details: {
            title: 'Đại hội Đại biểu lần thứ I của Đảng',
            summary: 'Đánh dấu sự khôi phục hoàn toàn của hệ thống tổ chức Đảng và phong trào cách mạng của quần chúng nhân dân, chuẩn bị bước vào cao trào đấu tranh mới.',
            dates: '27/03/1935 - 31/03/1935',
            figures: 'Lê Hồng Phong'
          }
        }
      ]
    },
    {
      id: 'branch-3',
      label: '3. Phong trào Dân chủ 1936 - 1939',
      x: 680,
      y: 740,
      type: 'branch',
      side: 'left',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p2',
      details: {
        title: 'Phong trào Dân chủ công khai (1936 - 1939)',
        summary: 'Giai đoạn tận dụng thời cơ chính trị thuận lợi để mở rộng phong trào đấu tranh chính trị công khai, đòi quyền dân sinh, dân chủ cho nhân dân.',
        dates: '1936 - 1939',
        figures: 'Nguyễn Văn Cừ, Hà Huy Tập, Lê Hồng Phong...'
      },
      children: [
        {
          id: '3-1',
          label: 'Bối cảnh thế giới & Pháp',
          x: 260,
          y: 620,
          type: 'leaf',
          details: {
            title: 'Chủ nghĩa phát xít & Mặt trận Nhân dân Pháp',
            summary: 'Chủ nghĩa phát xít đe dọa chiến tranh. Mặt trận Nhân dân Pháp lên cầm quyền, ban hành một số chính sách nới lỏng quyền tự do dân chủ và ân xá tù chính trị ở thuộc địa.',
            dates: 'Năm 1936'
          }
        },
        {
          id: '3-2',
          label: 'Hội nghị TW 7/1936',
          x: 260,
          y: 680,
          type: 'leaf',
          details: {
            title: 'Hội nghị Trung ương tại Thượng Hải',
            summary: 'Do Lê Hồng Phong chủ trì. Đảng xác định nhiệm vụ trước mắt là chống phát xít, chống chiến tranh đế quốc, đòi dân sinh dân chủ; thành lập Mặt trận Nhân dân phản đế Đông Dương.',
            dates: 'Tháng 7/1936',
            figures: 'Lê Hồng Phong'
          }
        },
        {
          id: '3-3',
          label: 'Các hình thức đấu tranh',
          x: 260,
          y: 740,
          type: 'leaf',
          details: {
            title: 'Đông Dương Đại hội & Báo chí công khai',
            summary: 'Vận động Đông Dương Đại hội thu thập nguyện vọng dân chúng; đấu tranh nghị trường; xuất bản báo chí cách mạng công khai; mít tinh lớn tại nhà Đấu Xảo (Hà Nội) kỷ niệm 1/5/1938.',
            dates: '1936 - 1938'
          }
        },
        {
          id: '3-4',
          label: 'Hội nghị TW 1938',
          x: 260,
          y: 800,
          type: 'leaf',
          details: {
            title: 'Mặt trận Dân chủ Đông Dương',
            summary: 'Thành lập Mặt trận Dân chủ thống nhất Đông Dương nhằm tập hợp rộng rãi các lực lượng xã hội đấu tranh chống phát xít và phản động thuộc địa.',
            dates: 'Tháng 3/1938',
            figures: 'Nguyễn Văn Cừ (Tổng Bí thư)'
          }
        },
        {
          id: '3-5',
          label: 'Ý nghĩa phong trào',
          x: 260,
          y: 860,
          type: 'leaf',
          details: {
            title: 'Cuộc Tổng diễn tập lần thứ hai',
            summary: 'Xây dựng đội quân chính trị đông đảo gồm hàng triệu quần chúng được rèn luyện đấu tranh công khai. Là cuộc diễn tập thứ hai chuẩn bị cho cách mạng thắng lợi.',
            dates: '1936 - 1939'
          }
        }
      ]
    },
    {
      id: 'branch-4',
      label: '4. Chuyển hướng chiến lược',
      x: 680,
      y: 1020,
      type: 'branch',
      side: 'left',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Chuyển hướng chỉ đạo Chiến lược cách mạng (1939 - 1941)',
        summary: 'Bối cảnh Chiến tranh thế giới thứ hai bùng nổ. Đảng quyết định chuyển hẳn vào hoạt động bí mật và đưa nhiệm vụ giải phóng dân tộc lên hàng đầu.',
        dates: '1939 - 1941',
        figures: 'Nguyễn Văn Cừ, Nguyễn Ái Quốc...'
      },
      children: [
        {
          id: '4-1',
          label: 'Chiến tranh thế giới II (9/1939)',
          x: 260,
          y: 960,
          type: 'leaf',
          details: {
            title: 'Đế quốc tăng cường phát xít hóa',
            summary: 'Đức tấn công Ba Lan. Thực dân Pháp tăng cường vơ vét sức người sức của ở Đông Dương phục vụ chiến tranh, ra sức cấm đoán, bắt giam các đảng viên.',
            dates: 'Tháng 9/1939'
          }
        },
        {
          id: '4-2',
          label: 'Nhật vào Đông Dương (9/1940)',
          x: 260,
          y: 1020,
          type: 'leaf',
          details: {
            title: 'Pháp hàng Nhật - Nhật lấn chiếm',
            summary: 'Tháng 9/1940, quân Nhật đổ bộ vào Đông Dương. Thực dân Pháp đầu hàng dâng nước ta cho Nhật. Cách mạng bùng nổ với các cuộc khởi nghĩa Bắc Sơn, Nam Kỳ.',
            dates: 'Tháng 9/1940'
          }
        },
        {
          id: '4-3',
          label: 'Một cổ hai tròng',
          x: 260,
          y: 1080,
          type: 'leaf',
          details: {
            title: 'Nhân dân lầm than áp bức cực độ',
            summary: 'Nhân dân chịu ách áp bức và bóc lột của cả hai kẻ thù: thực dân Pháp và phát xít Nhật. Mâu thuẫn dân tộc dâng cao thúc đẩy ý chí khởi nghĩa cướp chính quyền cứu nước.',
            dates: '1940 - 1945'
          }
        }
      ]
    },

    // RIGHT SIDE: Direct Preparation & Revolution (1939 - 1945)
    {
      id: 'branch-5',
      label: '5. Các Hội nghị Trung ương',
      x: 1520,
      y: 180,
      type: 'branch',
      side: 'right',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Các Hội nghị BCH Trung ương Đảng chuyển hướng chiến lược',
        summary: 'Các hội nghị cốt lõi của BCH Trung ương Đảng nhằm hoàn chỉnh đường lối chỉ đạo, quyết định tương lai sống còn của dân tộc.',
        dates: '11/1939 - 5/1941',
        figures: 'Nguyễn Văn Cừ, Nguyễn Ái Quốc...'
      },
      children: [
        {
          id: '5-1',
          label: 'Hội nghị TW VI (11/1939)',
          x: 1940,
          y: 120,
          type: 'leaf',
          details: {
            title: 'Đặt nhiệm vụ Giải phóng dân tộc lên số 1',
            summary: 'Họp tại Bà Điểm (Hóc Môn) do TBT Nguyễn Văn Cừ chủ trì. Quyết định rút vào hoạt động bí mật, đặt nhiệm vụ giải phóng dân tộc làm mục tiêu tối cao, tạm gác khẩu hiệu cách mạng ruộng đất.',
            dates: 'Tháng 11/1939',
            figures: 'Nguyễn Văn Cừ'
          }
        },
        {
          id: '5-2',
          label: 'Hội nghị TW VII (11/1940)',
          x: 1940,
          y: 180,
          type: 'leaf',
          details: {
            title: 'Duy trì & Phát triển lực lượng vũ trang',
            summary: 'Họp tại Đình Bảng (Bắc Ninh). Hội nghị chủ trương duy trì đội du kích Bắc Sơn, hoãn cuộc khởi nghĩa Nam Kỳ để chuẩn bị lực lượng, hướng tới đấu tranh vũ trang.',
            dates: 'Tháng 11/1940',
            figures: 'Trường Chinh'
          }
        },
        {
          id: '5-3',
          label: 'Hội nghị TW VIII (5/1941)',
          x: 1940,
          y: 240,
          type: 'leaf',
          details: {
            title: 'Hoàn chỉnh chuyển hướng chiến lược',
            summary: 'Họp tại Pác Bó dưới sự chủ trì của lãnh tụ Nguyễn Ái Quốc. Đặt quyền lợi dân tộc lên trên hết, thành lập Mặt trận Việt Minh ngày 19/5/1941, chuẩn bị khởi nghĩa vũ trang giành chính quyền.',
            dates: '10/05/1941 - 19/05/1941',
            figures: 'Nguyễn Ái Quốc (Hồ Chí Minh)'
          }
        }
      ]
    },
    {
      id: 'branch-6',
      label: '6. Chuẩn bị khởi nghĩa vũ trang',
      x: 1520,
      y: 460,
      type: 'branch',
      side: 'right',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Xây dựng Lực lượng Cách mạng và Căn cứ địa',
        summary: 'Tích cực chuẩn bị cả về lực lượng chính trị đại đoàn kết toàn dân và xây dựng lực lượng vũ trang nòng cốt, đặt căn cứ địa Việt Bắc làm đầu não cách mạng.',
        dates: '1941 - 1944',
        figures: 'Hồ Chí Minh, Võ Nguyên Giáp...'
      },
      children: [
        {
          id: '6-1',
          label: 'Lực lượng chính trị (Việt Minh)',
          x: 1940,
          y: 400,
          type: 'leaf',
          details: {
            title: 'Mặt trận Việt Minh tập hợp quần chúng',
            summary: 'Thành lập các hội Cứu quốc ở khắp các làng xã (Công nhân cứu quốc, Nông dân cứu quốc...). Tạo nên khối liên minh chính trị vững chắc của toàn dân tộc Việt Nam.',
            dates: 'Từ 1941'
          }
        },
        {
          id: '6-2',
          label: 'Lực lượng vũ trang (VNTTGPQ)',
          x: 1940,
          y: 460,
          type: 'leaf',
          details: {
            title: 'Đội quân nòng cốt cách mạng ra đời',
            summary: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân ngày 22/12/1944 tại Cao Bằng gồm 34 chiến sĩ, do đồng chí Võ Nguyên Giáp chỉ huy, tiền thân của Quân đội Nhân dân Việt Nam.',
            dates: '22/12/1944',
            figures: 'Võ Nguyên Giáp, Hồ Chí Minh'
          }
        },
        {
          id: '6-3',
          label: 'Căn cứ địa cách mạng Việt Bắc',
          x: 1940,
          y: 520,
          type: 'leaf',
          details: {
            title: 'Bàn đạp Căn cứ địa Bắc Sơn - Võ Nhai - Việt Bắc',
            summary: 'Xây dựng hệ thống an toàn khu từ Cao Bằng mở rộng ra Lạng Sơn, Tuyên Quang, Thái Nguyên... làm hậu phương vững chắc che chở cho cơ quan trung ương Đảng hoạt động.',
            dates: '1940 - 1945'
          }
        }
      ]
    },
    {
      id: 'branch-7',
      label: '7. Cao trào kháng Nhật cứu nước',
      x: 1520,
      y: 740,
      type: 'branch',
      side: 'right',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Cao trào Kháng Nhật cứu nước (Tiền khởi nghĩa)',
        summary: 'Sau khi Nhật lật đổ Pháp, Đảng lãnh đạo quần chúng chuyển sang thời kỳ tiền khởi nghĩa, chiếm lĩnh chính quyền từng phần và phá kho thóc giải quyết nạn đói.',
        dates: '3/1945 - 8/1945',
        figures: 'Trường Chinh, Võ Nguyên Giáp...'
      },
      children: [
        {
          id: '7-1',
          label: 'Nhật đảo chính Pháp (9/3/1945)',
          x: 1940,
          y: 620,
          type: 'leaf',
          details: {
            title: 'Nhật độc chiếm Đông Dương',
            summary: 'Quân Nhật bất ngờ nổ súng đảo chính lật đổ toàn bộ chính quyền thực dân Pháp ở Đông Dương. Quân Pháp nhanh chóng đầu hàng dâng lại quyền thống trị cho Nhật.',
            dates: '09/03/1945'
          }
        },
        {
          id: '7-2',
          label: 'Chỉ thị "Nhật-Pháp bắn nhau..."',
          x: 1940,
          y: 680,
          type: 'leaf',
          details: {
            title: 'Chỉ thị lịch sử phát động Cao trào',
            summary: 'Ngày 12/3/1945, Đảng ra chỉ thị xác định kẻ thù chính duy nhất trước mắt là phát xít Nhật, đổi khẩu hiệu đấu tranh và phát động cao trào kháng Nhật cứu nước mạnh mẽ.',
            dates: '12/03/1945',
            figures: 'Ban Thường vụ TW Đảng'
          }
        },
        {
          id: '7-3',
          label: 'Phá kho thóc Nhật cứu đói',
          x: 1940,
          y: 740,
          type: 'leaf',
          details: {
            title: 'Giải quyết nạn đói, tập hợp hàng triệu dân',
            summary: 'Phong trào phá kho thóc Nhật giải quyết nạn đói nổ ra rầm rộ khắp Bắc Kỳ và Trung Kỳ. Thu hút hàng triệu nông dân tham gia Việt Minh, chuẩn bị khởi nghĩa chính trị.',
            dates: 'Tháng 3 - 6/1945'
          }
        },
        {
          id: '7-4',
          label: 'Khởi nghĩa từng phần',
          x: 1940,
          y: 800,
          type: 'leaf',
          details: {
            title: 'Giành chính quyền cấp cơ sở',
            summary: 'Lực lượng tự vệ và quần chúng nổi dậy chiếm chính quyền tay sai cấp xã, huyện, lập ra Ủy ban nhân dân cách mạng ở nhiều địa phương miền núi và đồng bằng.',
            dates: 'Tháng 4 - 8/1945'
          }
        },
        {
          id: '7-5',
          label: 'Khu giải phóng Việt Bắc (6/1945)',
          x: 1940,
          y: 860,
          type: 'leaf',
          details: {
            title: 'Thành lập Khu giải phóng Việt Bắc',
            summary: 'Thành lập khu giải phóng gồm 6 tỉnh Việt Bắc dưới sự chỉ đạo trực tiếp của Hồ Chí Minh, đóng vai trò là thủ đô kháng chiến, căn cứ địa của cả nước.',
            dates: '04/06/1945',
            figures: 'Hồ Chí Minh'
          }
        }
      ]
    },
    {
      id: 'branch-8',
      label: '8. Diễn biến Tổng khởi nghĩa',
      x: 1520,
      y: 1020,
      type: 'branch',
      side: 'right',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Diễn biến Tổng khởi nghĩa giành chính quyền',
        summary: 'Chớp thời cơ vàng lịch sử, toàn thể nhân dân Việt Nam đồng loạt đứng lên giành chính quyền trên phạm vi cả nước chỉ trong vòng 15 ngày.',
        dates: '14/08/1945 - 28/08/1945',
        figures: 'Hồ Chí Minh, Trường Chinh...'
      },
      children: [
        {
          id: '8-1',
          label: 'Thời cơ vàng của Cách mạng',
          x: 1940,
          y: 930,
          type: 'leaf',
          details: {
            title: 'Nhật đầu hàng Đồng minh',
            summary: 'Ngày 15/8/1945, Nhật đầu hàng Đồng minh vô điều kiện. Quân Nhật ở Đông Dương rệu rã hoang mang. Thời cơ ngàn năm có một xuất hiện đòi hỏi hành động khẩn cấp.',
            dates: '15/08/1945'
          }
        },
        {
          id: '8-2',
          label: 'Đại hội Quốc dân Tân Trào',
          x: 1940,
          y: 990,
          type: 'leaf',
          details: {
            title: 'Thành lập Chính phủ lâm thời',
            summary: 'Đại hội quyết định tán thành Tổng khởi nghĩa giành chính quyền, thông qua 10 chính sách lớn của Việt Minh, bầu Ủy ban dân tộc giải phóng do Hồ Chí Minh làm Chủ tịch.',
            dates: '16/08/1945',
            figures: 'Hồ Chí Minh'
          }
        },
        {
          id: '8-3',
          label: 'Tổng khởi nghĩa tại 3 thành phố',
          x: 1940,
          y: 1050,
          type: 'leaf',
          details: {
            title: 'Thắng lợi tại Hà Nội, Huế, Sài Gòn',
            summary: 'Cuộc khởi nghĩa giành chính quyền bùng nổ thắng lợi vẻ vang tại Hà Nội (19/8), Huế (23/8), và Sài Gòn (25/8), đập tan bộ máy cai trị trung ương của chính quyền cũ.',
            dates: '19/08 - 25/08/1945'
          }
        },
        {
          id: '8-4',
          label: 'Bảo Đại thoái vị (30/8)',
          x: 1940,
          y: 1110,
          type: 'leaf',
          details: {
            title: 'Xóa bỏ chế độ quân chủ ngàn năm',
            summary: 'Tại Huế, vua Bảo Đại tuyên bố thoái vị giao nộp ấn kiếm cho phái đoàn Chính phủ cách mạng lâm thời với câu nói nổi tiếng: "Thà làm dân một nước độc lập hơn làm vua một nước nô lệ".',
            dates: '30/08/1945',
            figures: 'Bảo Đại, Trần Huy Liệu'
          }
        }
      ]
    },

    // BOTTOM: Establishment of the New State
    {
      id: 'branch-9',
      label: '9. Khai sinh nước Việt Nam mới',
      x: 1100,
      y: 980,
      type: 'branch',
      side: 'bottom',
      color: 'bg-museum-creamDark border-museum-red/40 hover:border-museum-red text-museum-charcoal font-bold',
      periodId: 'p3',
      details: {
        title: 'Thành lập nước Việt Nam Dân chủ Cộng hòa',
        summary: 'Mốc son vĩ đại mở ra kỷ nguyên mới độc lập dân tộc gắn liền với chủ nghĩa xã hội cho nhân dân Việt Nam.',
        dates: '02/09/1945',
        figures: 'Hồ Chí Minh...'
      },
      children: [
        {
          id: '9-1',
          label: 'Tuyên ngôn Độc lập (2/9/1945)',
          x: 940,
          y: 1160,
          type: 'leaf',
          details: {
            title: 'Khai sinh nước Việt Nam mới',
            summary: 'Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc bản Tuyên ngôn Độc lập tại quảng trường Ba Đình lịch sử, trịnh trọng tuyên bố thành lập nước Việt Nam Dân chủ Cộng hòa trước thế giới.',
            dates: '02/09/1945',
            figures: 'Hồ Chí Minh'
          }
        },
        {
          id: '9-2',
          label: 'Ý nghĩa lịch sử thắng lợi',
          x: 1100,
          y: 1160,
          type: 'leaf',
          details: {
            title: 'Bước ngoặt lịch sử dân tộc',
            summary: 'Đưa nhân dân Việt Nam từ thân phận nô lệ lên làm chủ vận mệnh nước nhà; đập tan xiềng xích thực dân. Cổ vũ mạnh mẽ phong trào giải phóng dân tộc thuộc địa trên toàn thế giới.',
            dates: 'Tháng 9/1945'
          }
        },
        {
          id: '9-3',
          label: 'Nguyên nhân thắng lợi',
          x: 1260,
          y: 1160,
          type: 'leaf',
          details: {
            title: 'Tập hợp sức mạnh vĩ đại',
            summary: 'Đường lối cách mạng đúng đắn của Đảng Cộng sản Đông Dương; sự đoàn kết keo sơn của toàn thể nhân dân Việt Nam trong Mặt trận Việt Minh; cùng thời cơ quốc tế thuận lợi.',
            dates: 'Tháng 9/1945',
            figures: 'Hồ Chí Minh, Trường Chinh'
          }
        }
      ]
    }
  ]
};

// Bezier curve generator for SVG connections
const getBezierPath = (x1, y1, x2, y2) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  // If nodes are vertical (like branch-9), use vertical curve, else use horizontal curve
  if (Math.abs(x1 - x2) < 50) {
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  }
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
};

export default function Mindmap() {
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'outline'
  const [scale, setScale] = useState(0.85);
  const [pan, setPan] = useState({ x: -10, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Collapse/Expand state for the branches on canvas
  const [expandedBranches, setExpandedBranches] = useState(
    new Set(['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5', 'branch-6', 'branch-7', 'branch-8', 'branch-9'])
  );

  // Collapse/Expand state for the vertical tree view (outline mode)
  const [outlineExpanded, setOutlineExpanded] = useState({
    'branch-1': true,
    'branch-2': false,
    'branch-3': false,
    'branch-4': false,
    'branch-5': false,
    'branch-6': false,
    'branch-7': false,
    'branch-8': false,
    'branch-9': false
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Dynamic Fit View calculation
  const fitView = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 40;
    const mapWidth = 1900; // bounding box width of all nodes (from 260-70 to 1940+70)
    const mapHeight = 1180; // bounding box height of all nodes (from 60-27 to 1160+27)

    // Calculate scale factor to fit within visible rect with safe padding
    const scaleX = (rect.width - padding * 2) / mapWidth;
    const scaleY = (rect.height - padding * 2) / mapHeight;
    const newScale = Math.max(Math.min(scaleX, scaleY, 1.2), 0.35); // Cap scale between 0.35 and 1.2

    // Calculate center coordinates
    const centerX = rect.width / 2 - 1100 * newScale;
    const centerY = rect.height / 2 - 600 * newScale;

    setScale(newScale);
    setPan({ x: centerX, y: centerY });
  };

  // Center the view on start & when fullscreen changes
  useEffect(() => {
    if (activeTab === 'canvas') {
      setTimeout(fitView, 120);
    }
  }, [activeTab, isFullscreen]);

  // Handle window resizing
  useEffect(() => {
    if (activeTab === 'canvas') {
      window.addEventListener('resize', fitView);
      return () => window.removeEventListener('resize', fitView);
    }
  }, [activeTab]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Search logic: search query filters node label/summary
  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightedNodes(new Set());
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = new Set();

    // Helper function to search nodes recursively
    const searchNode = (node) => {
      const labelMatch = node.label.toLowerCase().includes(query);
      const titleMatch = node.details?.title?.toLowerCase().includes(query);
      const summaryMatch = node.details?.summary?.toLowerCase().includes(query);
      const figureMatch = node.details?.figures?.toLowerCase().includes(query);
      
      if (labelMatch || titleMatch || summaryMatch || figureMatch) {
        matches.add(node.id);
        // If it's a leaf node, we need to ensure its parent branch is expanded
        if (node.id.includes('-') && !node.id.startsWith('branch')) {
          const parentId = `branch-${node.id.split('-')[0]}`;
          setExpandedBranches(prev => {
            const next = new Set(prev);
            next.add(parentId);
            return next;
          });
        }
      }
      
      if (node.children) {
        node.children.forEach(child => searchNode(child));
      }
    };

    searchNode(MINDMAP_NODES);
    setHighlightedNodes(matches);
  }, [searchQuery]);

  // Pan controls via dragging
  const handleMouseDown = (e) => {
    if (e.target.closest('.node-element') || e.target.closest('.control-panel')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.08, 1.8));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.08, 0.4));
  
  const handleReset = () => {
    fitView();
    setSearchQuery('');
    setSelectedNode(null);
  };

  // Toggle branches
  const toggleBranch = (branchId, e) => {
    e.stopPropagation();
    setExpandedBranches(prev => {
      const next = new Set(prev);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  // Outline branch toggle
  const toggleOutlineBranch = (branchId) => {
    setOutlineExpanded(prev => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  // Jump to specific learning subsection in main PeriodContent
  const jumpToPeriod = (periodId, subSectionId = null) => {
    // Save state in localStorage so the main app knows what to load
    localStorage.setItem('vnr_active_period', periodId);
    
    // Dispatch a custom event to change activePeriod state in App.jsx
    const event = new CustomEvent('navigatePeriod', { 
      detail: { periodId, subSectionId } 
    });
    window.dispatchEvent(event);

    // If subSectionId is provided, wait a bit and scroll to it
    if (subSectionId) {
      setTimeout(() => {
        const el = document.getElementById(subSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  // Compile all SVGs lines for connections
  const renderConnections = () => {
    const lines = [];

    MINDMAP_NODES.children.forEach(branch => {
      // Connect Root to Branch
      lines.push(
        <path
          key={`line-${MINDMAP_NODES.id}-${branch.id}`}
          d={getBezierPath(MINDMAP_NODES.x, MINDMAP_NODES.y, branch.x, branch.y)}
          fill="none"
          stroke={highlightedNodes.has(branch.id) ? "#b45309" : "#7f1d1d"}
          strokeWidth={highlightedNodes.has(branch.id) ? "3.5" : "2"}
          strokeOpacity={highlightedNodes.has(branch.id) ? "0.9" : "0.55"}
          className="transition-all duration-300"
        />
      );

      // Connect Branch to Leaves if expanded
      if (expandedBranches.has(branch.id) && branch.children) {
        branch.children.forEach(leaf => {
          lines.push(
            <path
              key={`line-${branch.id}-${leaf.id}`}
              d={getBezierPath(branch.x, branch.y, leaf.x, leaf.y)}
              fill="none"
              stroke={highlightedNodes.has(leaf.id) ? "#b45309" : "#b45309"}
              strokeWidth={highlightedNodes.has(leaf.id) ? "2.5" : "1"}
              strokeOpacity={highlightedNodes.has(leaf.id) ? "0.8" : "0.35"}
              strokeDasharray={leaf.type === 'leaf' ? "" : "3,3"}
              className="transition-all duration-300"
            />
          );
        });
      }
    });

    return <g>{lines}</g>;
  };

  // Render a node on canvas
  const renderNodeElement = (node, parentNode = null) => {
    const isRoot = node.type === 'root';
    const isBranch = node.type === 'branch';
    const isLeaf = node.type === 'leaf';
    const isExpanded = expandedBranches.has(node.id);
    const isHighlighted = highlightedNodes.has(node.id);
    const isSelected = selectedNode?.id === node.id;

    // Dimensions for offset centering
    const isBranch9Child = node.id.startsWith('9-');
    let w = 230;
    let h = 72;
    if (isRoot) { w = 270; h = 84; }
    if (isLeaf) { 
      w = isBranch9Child ? 140 : 180; 
      h = 54; 
    }

    const left = node.x - w / 2;
    const top = node.y - h / 2;

    let borderStyle = "border border-museum-red/20";
    let bgStyle = "bg-white text-museum-charcoal";
    let shadowStyle = "shadow-sm";

    if (isRoot) {
      bgStyle = "bg-gradient-to-br from-museum-red via-red-900 to-red-950 text-white font-serif";
      borderStyle = "border-2 border-museum-gold";
      shadowStyle = "shadow-xl";
    } else if (isBranch) {
      bgStyle = "bg-museum-creamDark text-museum-charcoal font-serif";
      borderStyle = "border-2 border-museum-red/35 hover:border-museum-red/70";
      shadowStyle = "shadow-md";
    } else if (isLeaf) {
      bgStyle = "bg-white text-museum-charcoal hover:bg-museum-cream/35";
      borderStyle = "border border-museum-gold/30 hover:border-museum-gold/80";
    }

    if (isHighlighted) {
      borderStyle = "border-2 border-museum-gold ring-4 ring-museum-gold/35";
      shadowStyle = "shadow-lg scale-105";
    }

    if (isSelected) {
      borderStyle = "border-2 border-museum-red ring-4 ring-museum-red/25";
      shadowStyle = "shadow-lg scale-105";
    }

    // Set custom padding for Branch 9 children
    const paddingStyle = isBranch9Child ? "p-2 flex items-center justify-center text-center" : "p-3 flex items-center justify-between";

    return (
      <div
        key={node.id}
        className="absolute node-element select-none"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${w}px`,
          height: `${h}px`,
          zIndex: isRoot ? 30 : isBranch ? 20 : 10
        }}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => setSelectedNode(node)}
          className={`w-full h-full rounded-xl cursor-pointer text-left transition-colors duration-200 ${bgStyle} ${borderStyle} ${shadowStyle} ${paddingStyle}`}
        >
          <div className="flex-grow pr-1">
            <span className={`block font-serif line-clamp-2 ${
              isRoot 
                ? 'text-sm font-bold text-center leading-snug tracking-wide' 
                : isBranch ? 'text-xs font-bold leading-tight text-museum-red' 
                : isBranch9Child ? 'text-[10px] leading-tight font-semibold text-center'
                : 'text-[11px] leading-tight font-medium'
            }`}>
              {node.label}
            </span>
            {isBranch && node.periodId && (
              <span className="text-[9px] text-museum-gold font-semibold uppercase tracking-wider block mt-0.5">
                {node.periodId === 'p1' ? '1930 - 1935' : node.periodId === 'p2' ? '1936 - 1939' : '1939 - 1945'}
              </span>
            )}
          </div>

          {/* Expand/Collapse indicator for branches */}
          {isBranch && node.children && (
            <button
              onClick={(e) => toggleBranch(node.id, e)}
              className="p-1 rounded-full text-museum-gold hover:bg-museum-red/10 hover:text-museum-red transition-colors shrink-0 ml-1"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </motion.div>
      </div>
    );
  };

  // Compile nodes recursively for rendering
  const renderNodes = () => {
    const list = [renderNodeElement(MINDMAP_NODES)];

    MINDMAP_NODES.children.forEach(branch => {
      list.push(renderNodeElement(branch, MINDMAP_NODES));

      if (expandedBranches.has(branch.id) && branch.children) {
        branch.children.forEach(leaf => {
          list.push(renderNodeElement(leaf, branch));
        });
      }
    });

    return list;
  };

  // Get matching subSectionId based on node ID to scroll to exact sub-section in main PeriodContent
  const getSubSectionId = (nodeId) => {
    if (nodeId.startsWith('branch-')) {
      const idx = nodeId.split('-')[1];
      if (idx === '1') return 'p1-s1';
      if (idx === '2') return 'p1-s4'; // Đại hội I
      if (idx === '3') return 'p2-s1';
      if (idx === '4') return 'p3-s1';
      if (idx === '5') return 'p3-s1'; // Hội nghị TW VI
      if (idx === '6') return 'p3-s2'; // Lực lượng vũ trang
      if (idx === '7') return 'p3-s3'; // Cao trào kháng Nhật
      if (idx === '8') return 'p3-s4'; // Cách mạng tháng tám
      if (idx === '9') return 'p3-s4'; // Tuyên ngôn độc lập
    }
    
    // Leaf node specific mapping
    const map = {
      '1-1': 'p1-s1', // bối cảnh
      '1-2': 'p1-s2', // chủ trương
      '1-3': 'p1-s3', // phong trào
      '1-4': 'p1-s3', // xô viết Nghệ Tĩnh
      '1-5': 'p1-s4', // ý nghĩa p1
      '2-1': 'p1-s4', // khôi phục tổ chức
      '2-2': 'p1-s4', // hoạt động trong tù
      '2-3': 'p1-s4', // ban lãnh đạo hải ngoại
      '2-4': 'p1-s4', // đại hội I
      '3-1': 'p2-s1', // bối cảnh
      '3-2': 'p2-s2', // hội nghị tw 7/1936
      '3-3': 'p2-s3', // các hình thức đấu tranh
      '3-4': 'p2-s2', // hội nghị tw 1938
      '3-5': 'p2-s4', // ý nghĩa p2
      '4-1': 'p3-s1', // cttg ii
      '4-2': 'p3-s1', // nhật vào đông dương
      '4-3': 'p3-s1', // một cổ hai tròng
      '5-1': 'p3-s1', // tw vi
      '5-2': 'p3-s1', // tw vii
      '5-3': 'p3-s1', // tw viii
      '6-1': 'p3-s2', // lực lượng chính trị
      '6-2': 'p3-s2', // lực lượng vũ trang
      '6-3': 'p3-s2', // căn cứ địa
      '7-1': 'p3-s3', // nhật đảo chính
      '7-2': 'p3-s3', // chỉ thị 12/3
      '7-3': 'p3-s3', // phá kho thóc
      '7-4': 'p3-s3', // khởi nghĩa từng phần
      '7-5': 'p3-s3', // khu giải phóng
      '8-1': 'p3-s4', // thời cơ
      '8-2': 'p3-s4', // đại hội quốc dân
      '8-3': 'p3-s4', // thắng lợi 3 tp
      '8-4': 'p3-s4', // bảo đại thoái vị
      '9-1': 'p3-s4', // tuyên ngôn độc lập
      '9-2': 'p3-s4', // thành lập vndcch
      '9-3': 'p3-s4', // ý nghĩa cách mạng t8
      '9-4': 'p3-s4'  // nguyên nhân thắng lợi
    };

    return map[nodeId] || null;
  };

  return (
    <div 
      id="mindmap"
      className={isFullscreen 
        ? "fixed inset-0 z-[9999] bg-[#faf6ee] p-6 flex flex-col h-screen w-screen" 
        : "max-w-7xl mx-auto px-4 py-8 text-left relative z-10 flex flex-col h-[calc(100vh-260px)] min-h-[680px] scroll-mt-24"
      }
    >
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0 bg-white/60 backdrop-blur border border-museum-red/10 p-4 rounded-2xl shadow-sm">
        <div>
          <span className="text-xs font-bold text-museum-red bg-museum-red/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Học tập Lịch sử trực quan
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal mt-2">
            Sơ Đồ Tư Duy Cách Mạng Việt Nam (1930 - 1945)
          </h2>
          <p className="text-xs text-museum-charcoal/70 mt-1 max-w-2xl">
            Lấy mốc Cách mạng Tháng Tám làm trung tâm, kéo và click chuột để khám phá toàn bộ chặng đường lịch sử 15 năm một cách liền mạch.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-museum-creamDark border border-museum-red/15 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold transition-all ${
              activeTab === 'canvas' 
                ? 'bg-museum-red text-white shadow-sm' 
                : 'text-museum-charcoal hover:bg-museum-cream'
            }`}
          >
            <Map size={14} />
            <span>Bản đồ tương tác</span>
          </button>
          <button
            onClick={() => setActiveTab('outline')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold transition-all ${
              activeTab === 'outline' 
                ? 'bg-museum-red text-white shadow-sm' 
                : 'text-museum-charcoal hover:bg-museum-cream'
            }`}
          >
            <AlignLeft size={14} />
            <span>Cấu trúc danh mục</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND MAP TOOLS (Active only on Canvas View) */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4 shrink-0">
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Tìm mốc sự kiện, nhân vật, bối cảnh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-museum-red/15 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-museum-red/40 text-sm shadow-sm transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-museum-red/40" size={16} />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-museum-charcoal/50 hover:text-museum-red"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Canvas zoom controls */}
        {activeTab === 'canvas' && (
          <div className="flex items-center gap-2 control-panel bg-white border border-museum-red/10 rounded-xl p-1.5 shadow-sm self-end sm:self-auto">
            <button
              onClick={handleZoomIn}
              title="Phóng to"
              className="p-2 rounded bg-museum-cream hover:bg-museum-creamDark text-museum-red transition-colors"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              title="Thu nhỏ"
              className="p-2 rounded bg-museum-cream hover:bg-museum-creamDark text-museum-red transition-colors"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình (Nhấn ESC để thoát)"}
              className="p-2 rounded bg-museum-cream hover:bg-museum-creamDark text-museum-red transition-colors flex items-center justify-center"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <div className="w-[1px] h-6 bg-museum-red/10 mx-1" />
            <button
              onClick={handleReset}
              title="Căn vừa sơ đồ"
              className="p-2 rounded bg-museum-cream hover:bg-museum-creamDark text-museum-red transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <RefreshCw size={14} />
              <span>Đặt lại</span>
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-grow relative overflow-hidden border border-museum-red/15 rounded-2xl bg-[#faf6ee] shadow-inner flex">
        
        {/* VIEW 1: INTERACTIVE SVG CANVAS */}
        {activeTab === 'canvas' && (
          <div
            ref={containerRef}
            className={`w-full h-full overflow-hidden relative cursor-grab active:cursor-grabbing`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background traditional Bronze Drum details behind nodes */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-museum-red">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                <polygon points="50,44 48,47 45,46 47,49 44,50 47,51 45,54 48,53 50,56 52,53 55,54 53,51 56,50 53,49 55,46 52,47" />
              </svg>
            </div>

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.25] z-0" style={{ 
              backgroundImage: 'radial-gradient(#b45309 0.65px, transparent 0.65px), radial-gradient(#7f1d1d 0.5px, #faf6ee 0.5px)', 
              backgroundSize: '40px 40px', 
              backgroundPosition: '0 0, 20px 20px' 
            }} />

            {/* Scaled/Panned Graph Container */}
            <div
              ref={canvasRef}
              className="absolute origin-top-left transition-transform duration-75 select-none z-10"
              style={{
                width: '2200px',
                height: '1200px',
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              }}
            >
              {/* SVG connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {renderConnections()}
              </svg>

              {/* HTML Nodes on top */}
              {renderNodes()}
            </div>
            
            {/* Canvas Instructions Overlay */}
            <div className="absolute bottom-4 left-4 pointer-events-none bg-white/80 backdrop-blur border border-museum-red/10 px-3 py-1.5 rounded-lg text-[10px] text-museum-charcoal/70 flex items-center gap-1.5 shadow-sm">
              <Info size={12} className="text-museum-gold" />
              <span>Cuộn chuột để zoom, nhấp giữ để kéo di chuyển bản đồ.</span>
            </div>
          </div>
        )}

        {/* VIEW 2: COLLAPSIBLE TREE LIST OUTLINE VIEW (Optimized for Mobile/Reading) */}
        {activeTab === 'outline' && (
          <div className="w-full h-full overflow-y-auto p-4 sm:p-8 bg-white max-w-4xl mx-auto rounded-2xl shadow-sm">
            <h3 className="font-serif text-lg font-bold text-museum-charcoal border-b border-museum-red/10 pb-3 mb-6 flex items-center gap-2">
              <Layers size={18} className="text-museum-red" />
              <span>Bản Thảo Hệ Thống Lịch Sử (9 Nhánh Lớn)</span>
            </h3>

            <div className="space-y-4">
              {/* Main Root Concept */}
              <div className="p-4 bg-gradient-to-br from-museum-red/5 to-museum-red/10 border-l-4 border-museum-red rounded-r-xl">
                <span className="text-[10px] font-bold text-museum-red uppercase">Khái niệm trung tâm</span>
                <h4 className="font-serif text-lg font-bold text-museum-charcoal mt-1">CÁCH MẠNG THÁNG TÁM 1945</h4>
                <p className="text-xs text-museum-charcoal/80 mt-1.5 leading-relaxed">
                  Đỉnh cao và đích đến thắng lợi cuối cùng của tiến trình cách mạng giải phóng dân tộc (1930 - 1945).
                </p>
                <button
                  onClick={() => setSelectedNode(MINDMAP_NODES)}
                  className="mt-3 flex items-center gap-1 text-xs font-bold text-museum-red hover:underline"
                >
                  Xem chi tiết lịch sử <ArrowRight size={12} />
                </button>
              </div>

              {/* 9 Branches Collapsible Lists */}
              {MINDMAP_NODES.children.map((branch, idx) => {
                const isOpen = outlineExpanded[branch.id];
                const isBranchHighlighted = highlightedNodes.has(branch.id);
                
                return (
                  <div key={branch.id} className={`border rounded-xl transition-all overflow-hidden ${isBranchHighlighted ? 'border-museum-gold ring-1 ring-museum-gold/30 shadow-md' : 'border-museum-red/10'}`}>
                    
                    {/* Branch Header */}
                    <button
                      onClick={() => toggleOutlineBranch(branch.id)}
                      className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                        isOpen ? 'bg-museum-cream font-bold' : 'bg-white hover:bg-museum-cream/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <span className="w-6 h-6 rounded bg-museum-red/10 text-museum-red text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className={`font-serif text-sm sm:text-base text-museum-charcoal ${isOpen ? 'text-museum-red font-bold' : ''}`}>
                            {branch.label}
                          </span>
                          <span className="text-[9px] font-bold text-museum-gold bg-museum-gold/10 px-2 py-0.5 rounded ml-2 uppercase shrink-0">
                            {branch.periodId === 'p1' ? '1930 - 1935' : branch.periodId === 'p2' ? '1936 - 1939' : '1939 - 1945'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNode(branch);
                          }}
                          className="px-2.5 py-1 rounded border border-museum-red/20 text-museum-red hover:bg-museum-red hover:text-white transition-colors text-[10px] font-bold"
                        >
                          Tóm tắt
                        </button>
                        {isOpen ? <ChevronDown size={18} className="text-museum-charcoal/50" /> : <ChevronRight size={18} className="text-museum-charcoal/50" />}
                      </div>
                    </button>

                    {/* Branch Leaves (Sub-items) */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-museum-red/5 bg-white divide-y divide-museum-red/5"
                        >
                          {branch.children && branch.children.map(leaf => {
                            const isLeafHighlighted = highlightedNodes.has(leaf.id);
                            
                            return (
                              <div 
                                key={leaf.id} 
                                className={`p-4 pl-8 sm:pl-12 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors ${
                                  isLeafHighlighted ? 'bg-museum-gold/5 border-l-2 border-museum-gold' : 'hover:bg-museum-cream/20'
                                }`}
                              >
                                <div>
                                  <h5 className="font-serif text-xs sm:text-sm font-semibold text-museum-charcoal">
                                    {leaf.label}
                                  </h5>
                                  {leaf.details?.dates && (
                                    <span className="text-[10px] text-museum-gold font-semibold flex items-center gap-1 mt-0.5">
                                      <Calendar size={10} />
                                      {leaf.details.dates}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                                  <button
                                    onClick={() => setSelectedNode(leaf)}
                                    className="text-xs text-museum-gold hover:text-museum-goldLight font-bold px-2 py-1 rounded"
                                  >
                                    Xem chi tiết
                                  </button>
                                  <button
                                    onClick={() => jumpToPeriod(branch.periodId, getSubSectionId(leaf.id))}
                                    className="flex items-center gap-0.5 bg-museum-red text-white hover:bg-museum-redLight px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                                  >
                                    <span>Học bài</span>
                                    <ArrowRight size={10} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SIDE DRAWER: Node Details Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="absolute top-0 right-0 h-full w-80 sm:w-[420px] bg-white border-l border-museum-red/20 shadow-2xl z-40 flex flex-col text-left"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-museum-red/10 flex justify-between items-center bg-museum-cream">
                <div className="flex items-center gap-2 text-museum-red">
                  <BookOpen size={18} />
                  <span className="font-serif font-bold text-xs uppercase tracking-wider">
                    {selectedNode.type === 'root' ? 'Chủ đề hạt nhân' : selectedNode.type === 'branch' ? 'Nhánh giai đoạn' : 'Sự kiện / Mốc lịch sử'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-full hover:bg-museum-red/15 text-museum-charcoal/50 hover:text-museum-red transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                
                {/* Node Title & Period info */}
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-museum-charcoal leading-snug">
                    {selectedNode.details?.title || selectedNode.label}
                  </h3>
                  
                  {selectedNode.details?.dates && (
                    <div className="flex items-center gap-1.5 text-xs text-museum-gold font-bold mt-2 bg-museum-gold/10 px-2.5 py-1 rounded-full w-fit">
                      <Calendar size={13} />
                      <span>{selectedNode.details.dates}</span>
                    </div>
                  )}
                </div>

                {/* Historical Summary Box */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-museum-red uppercase tracking-wider block border-b border-museum-red/10 pb-1">
                    Tóm tắt nội dung
                  </span>
                  <p className="text-xs sm:text-sm text-museum-charcoal/85 leading-relaxed font-sans text-justify">
                    {selectedNode.details?.summary || "Không có tóm tắt chi tiết cho mục này."}
                  </p>
                </div>

                {/* Key Figures involved */}
                {selectedNode.details?.figures && (
                  <div className="bg-museum-cream/60 border border-museum-gold/15 p-4 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-museum-gold uppercase tracking-wider block">
                      Nhân vật liên quan tiêu biểu
                    </span>
                    <p className="text-xs font-semibold text-museum-charcoal">
                      {selectedNode.details.figures}
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-museum-red/10 bg-museum-creamDark/40 flex gap-3 shrink-0">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="flex-grow py-3 border border-museum-red/25 text-museum-charcoal rounded-xl text-xs font-bold hover:bg-museum-cream transition-colors text-center"
                >
                  Đóng panel
                </button>
                {selectedNode.periodId && (
                  <button
                    onClick={() => {
                      jumpToPeriod(selectedNode.periodId, getSubSectionId(selectedNode.id));
                      setSelectedNode(null);
                    }}
                    className="flex-grow py-3 bg-museum-red text-white hover:bg-museum-redLight rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Đi tới bài học</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
